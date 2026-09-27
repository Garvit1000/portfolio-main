/* Minimal EXIF reader: pulls the capture date and GPS position out of a JPEG,
   entirely in the browser. Only reads the first 256 KB, where EXIF lives.
   Returns { date: Date|null, lat: number|null, lon: number|null }. */

export async function readExif(file) {
    const out = { date: null, lat: null, lon: null };
    try {
        const buf = await file.slice(0, 256 * 1024).arrayBuffer();
        const v = new DataView(buf);
        if (v.byteLength < 4 || v.getUint16(0) !== 0xffd8) return out; // not a JPEG
        let off = 2;
        while (off + 10 < v.byteLength) {
            const marker = v.getUint16(off);
            if ((marker & 0xff00) !== 0xff00) break;
            const size = v.getUint16(off + 2);
            // APP1 segment starting with "Exif\0\0"
            if (marker === 0xffe1 && v.getUint32(off + 4) === 0x45786966) {
                parseTiff(v, off + 10, out);
                break;
            }
            off += 2 + size;
        }
    } catch {
        // Malformed or truncated EXIF: fall back to manual entry
    }
    return out;
}

function parseTiff(v, start, out) {
    const le = v.getUint16(start) === 0x4949; // "II" little-endian, "MM" big-endian
    const u16 = (o) => v.getUint16(start + o, le);
    const u32 = (o) => v.getUint32(start + o, le);

    // IFD entries: tag (2) type (2) count (4) value-or-offset (4)
    const readIfd = (o) => {
        const tags = {};
        const n = u16(o);
        for (let i = 0; i < n; i++) {
            const e = o + 2 + i * 12;
            tags[u16(e)] = { count: u32(e + 4), valOff: e + 8 };
        }
        return tags;
    };
    const ascii = (t) => {
        const o = t.count > 4 ? u32(t.valOff) : t.valOff;
        let s = '';
        for (let i = 0; i < t.count - 1; i++) s += String.fromCharCode(v.getUint8(start + o + i));
        return s;
    };
    const rationals = (t) => {
        const o = u32(t.valOff);
        return Array.from({ length: t.count }, (_, i) => u32(o + i * 8) / (u32(o + i * 8 + 4) || 1));
    };
    const parseDate = (s) => {
        const m = s.match(/(\d{4}):(\d{2}):(\d{2})/);
        return m ? new Date(+m[1], +m[2] - 1, +m[3]) : null;
    };

    const ifd0 = readIfd(u32(4));

    // Date: DateTimeOriginal (0x9003) in the Exif sub-IFD, else DateTime (0x0132)
    if (ifd0[0x8769]) {
        const exif = readIfd(u32(ifd0[0x8769].valOff));
        const t = exif[0x9003] || exif[0x9004];
        if (t) out.date = parseDate(ascii(t));
    }
    if (!out.date && ifd0[0x0132]) out.date = parseDate(ascii(ifd0[0x0132]));

    // GPS sub-IFD: 1 LatRef, 2 Lat, 3 LonRef, 4 Lon (degrees, minutes, seconds)
    if (ifd0[0x8825]) {
        const gps = readIfd(u32(ifd0[0x8825].valOff));
        if (gps[2] && gps[4]) {
            const [ad, am, as] = rationals(gps[2]);
            const [od, om, os] = rationals(gps[4]);
            let lat = ad + am / 60 + as / 3600;
            let lon = od + om / 60 + os / 3600;
            if (gps[1] && ascii(gps[1]).startsWith('S')) lat = -lat;
            if (gps[3] && ascii(gps[3]).startsWith('W')) lon = -lon;
            if (Number.isFinite(lat) && Number.isFinite(lon) && !(lat === 0 && lon === 0)) {
                out.lat = lat;
                out.lon = lon;
            }
        }
    }
}
