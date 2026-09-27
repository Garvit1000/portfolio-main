import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowLeft01Icon, Download01Icon, Cancel01Icon, Add01Icon, Location01Icon } from '@hugeicons/core-free-icons';
import { readExif } from '../lib/exif';
import { placeFromCoords } from '../data/places';
import { engrave, renderStamp, renderSheet, ensureStampFonts, artSize, INKS, STAMP_W, STAMP_H } from '../lib/stamp-render';
import { loadSampleImage } from '../lib/sample-art';
import { playTear } from '../lib/tear-sound';
import { useUiSounds } from '../components/SoundProvider';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const MAX_PHOTOS = 6;
const TEAR_DISTANCE = 130; // px of drag before the perforations give

const toInputDate = (d) => {
    const x = d instanceof Date && !isNaN(d) ? d : new Date();
    return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
};
const fromInputDate = (s) => {
    const [y, m, d] = (s || '').split('-').map(Number);
    return y ? new Date(y, m - 1, d) : new Date();
};
const slug = (s) => (s || 'stamp').toLowerCase().normalize('NFKD').replace(/[^\w]+/g, '-').replace(/^-|-$/g, '') || 'stamp';

const loadImage = (url) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
});

const saveCanvas = (canvas, filename) => {
    canvas.toBlob((blob) => {
        if (!blob) return;
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }, 'image/png');
};

/* ---------- tear-off stage ---------- */

// The stamp sits on a sheet; drag it far enough and it rips free.
const TearStage = ({ src, onTear, busy }) => {
    const [drag, setDrag] = useState(null);     // { dx, dy } while dragging
    const [phase, setPhase] = useState('idle'); // idle | torn | returning
    const start = useRef(null);

    const onPointerDown = (e) => {
        if (phase !== 'idle' || busy) return;
        try { e.currentTarget.setPointerCapture(e.pointerId); } catch { /* capture is a nicety */ }
        start.current = { x: e.clientX, y: e.clientY };
        setDrag({ dx: 0, dy: 0 });
    };
    const onPointerMove = (e) => {
        if (!start.current) return;
        setDrag({ dx: e.clientX - start.current.x, dy: e.clientY - start.current.y });
    };
    const onPointerUp = () => {
        if (!start.current) return;
        start.current = null;
        const d = drag ? Math.hypot(drag.dx, drag.dy) : 0;
        if (d >= TEAR_DISTANCE) {
            // fly off and fade, snap back while invisible, then fade in like a fresh print
            setPhase('torn');
            onTear();
            setTimeout(() => { setDrag(null); setPhase('returning'); }, 650);
            setTimeout(() => setPhase('idle'), 1100);
        } else {
            setDrag(null);
        }
    };

    // Rubber-band resistance until the tear point, then it moves freely
    let tx = 0, ty = 0, rot = 0;
    if (drag) {
        const d = Math.hypot(drag.dx, drag.dy) || 1;
        const k = d < TEAR_DISTANCE ? 0.45 + 0.25 * (d / TEAR_DISTANCE) : 1;
        tx = drag.dx * k;
        ty = drag.dy * k;
        rot = Math.max(-12, Math.min(12, drag.dx * 0.06));
    }
    if (phase === 'torn') {
        const d = Math.hypot(tx, ty) || 1;
        tx += (tx / d) * 120;
        ty += (ty / d) * 120 - 40;
        rot *= 1.6;
    }
    const tension = drag ? Math.min(1, Math.hypot(drag.dx, drag.dy) / TEAR_DISTANCE) : 0;

    return (
        <div className="relative overflow-hidden rounded-[18px] bg-[#efe7d5] shadow-[inset_0_0_0_1px_rgba(60,50,40,0.08),inset_0_2px_12px_rgba(60,50,40,0.08)] px-6 py-10 sm:py-14 select-none">
            <div className="relative mx-auto w-[210px] sm:w-[240px] aspect-[300/380]">
                {/* neighbouring (empty) stamp slots so it reads as a sheet */}
                <div className="absolute inset-y-0 right-full w-full border border-dashed border-[rgba(60,50,40,0.16)] rounded-[2px]" aria-hidden="true" />
                <div className="absolute inset-y-0 left-full w-full border border-dashed border-[rgba(60,50,40,0.16)] rounded-[2px]" aria-hidden="true" />
                {/* where the stamp was: a faint torn gap */}
                <div className={`absolute inset-0 rounded-[2px] border border-dashed transition-opacity duration-300 ${drag || phase !== 'idle' ? 'opacity-100 border-[rgba(60,50,40,0.35)]' : 'opacity-0'}`} />
                {src && (
                    <img
                        src={src}
                        alt="Your stamp. Drag it off the sheet to tear it off and download."
                        draggable={false}
                        onPointerDown={onPointerDown}
                        onPointerMove={onPointerMove}
                        onPointerUp={onPointerUp}
                        onPointerCancel={onPointerUp}
                        className="absolute inset-0 h-full w-full touch-none cursor-grab active:cursor-grabbing"
                        style={{
                            transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg) scale(${drag ? 1.03 : 1})`,
                            opacity: phase === 'torn' ? 0 : 1,
                            filter: `drop-shadow(0 ${2 + tension * 14}px ${4 + tension * 18}px rgba(60,50,40,${0.22 + tension * 0.12}))`,
                            transition: start.current
                                ? 'none'
                                : phase === 'torn'
                                    ? 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 450ms ease 180ms'
                                    : phase === 'returning'
                                        ? 'opacity 400ms ease'
                                        : 'transform 420ms cubic-bezier(0.34, 1.56, 0.64, 1), filter 300ms ease',
                        }}
                    />
                )}
            </div>

            <p className="relative mt-6 text-center text-sm font-semibold text-foreground/55">
                {phase === 'torn' ? 'Torn off and saved.' : 'Drag the stamp off the sheet to tear it out.'}
            </p>
        </div>
    );
};

/* ---------- page ---------- */

const StampTool = () => {
    useDocumentTitle('Postmarked | Lab | Garvit Joshi');
    const { enabled: soundOn } = useUiSounds();

    const [photos, setPhotos] = useState([]); // { id, img, url, place, country, date, hasGps, hasDate }
    const [sample, setSample] = useState(null);
    const [selected, setSelected] = useState(0);
    const [ink, setInk] = useState('carmine');
    const [value, setValue] = useState('₹5');
    const [postmark, setPostmark] = useState(true);
    const [preview, setPreview] = useState({ src: null, canvas: null });
    const [error, setError] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const [rendering, setRendering] = useState(true);
    const fileRef = useRef(null);
    const engraveCache = useRef(new Map());
    const nextId = useRef(1);

    // Sample stamp shown before any photo is added
    useEffect(() => {
        loadSampleImage().then(img => setSample({
            id: 0, img, place: 'Anywhere', country: 'Earth', date: toInputDate(new Date()), hasGps: false, hasDate: false,
        }));
    }, []);

    // Memoised: the render effect below depends on this array's identity
    const items = useMemo(() => (photos.length ? photos : sample ? [sample] : []), [photos, sample]);
    const isSheet = photos.length > 1;
    const current = items[Math.min(selected, items.length - 1)];

    const engraved = useCallback((item, scale) => {
        const key = `${item.id}|${ink}|${scale}`;
        const cache = engraveCache.current;
        if (!cache.has(key)) {
            const { w, h } = artSize(scale);
            cache.set(key, engrave(item.img, w, h, INKS[ink].color));
        }
        return cache.get(key);
    }, [ink]);

    // Render the stamp (or sheet); debounced so typing a place stays smooth
    useEffect(() => {
        if (!items.length) return;
        let cancelled = false;
        setRendering(true);
        const t = setTimeout(async () => {
            await ensureStampFonts();
            if (cancelled) return;
            const scale = isSheet ? 2 : 3;
            const stamps = items.map(item => renderStamp({
                engraved: engraved(item, scale),
                ink, value, postmark, scale,
                place: item.place, country: item.country, date: fromInputDate(item.date),
            }));
            const canvas = isSheet ? renderSheet(stamps, { scale: 1 }) : stamps[0];
            if (cancelled) return;
            setPreview({ src: canvas.toDataURL('image/png'), canvas });
            setRendering(false);
        }, 120);
        return () => { cancelled = true; clearTimeout(t); };
    }, [items, ink, value, postmark, isSheet, engraved]);

    // Free the photos' object URLs when leaving the page
    const photosRef = useRef(photos);
    photosRef.current = photos;
    useEffect(() => () => photosRef.current.forEach(p => URL.revokeObjectURL(p.url)), []);

    const addFiles = async (fileList) => {
        setError('');
        const files = [...(fileList || [])].filter(f => f.type.startsWith('image/') || /\.(jpe?g|png|webp|heic)$/i.test(f.name));
        if (!files.length) return;
        const room = MAX_PHOTOS - photos.length;
        if (room <= 0) { setError(`A sheet holds up to ${MAX_PHOTOS} stamps.`); return; }
        if (files.length > room) setError(`Only the first ${room} fit on this sheet (max ${MAX_PHOTOS}).`);

        const added = [];
        for (const file of files.slice(0, room)) {
            const url = URL.createObjectURL(file);
            let img;
            try {
                img = await loadImage(url);
            } catch {
                URL.revokeObjectURL(url);
                setError(/heic/i.test(file.name) || /heic/i.test(file.type)
                    ? "This browser can't open HEIC photos. Export it as JPEG and try again."
                    : `Couldn't open ${file.name}.`);
                continue;
            }
            const exif = await readExif(file);
            const where = exif.lat != null ? placeFromCoords(exif.lat, exif.lon) : null;
            added.push({
                id: nextId.current++,
                img, url,
                place: where?.place || '',
                country: where?.country || '',
                date: toInputDate(exif.date || new Date(file.lastModified)),
                hasGps: !!where,
                hasDate: !!exif.date,
            });
        }
        if (added.length) {
            setPhotos(prev => {
                const next = [...prev, ...added];
                setSelected(prev.length ? next.length - 1 : 0);
                return next;
            });
        }
    };

    const updateCurrent = (patch) => {
        if (!photos.length) {
            setSample(s => ({ ...s, ...patch }));
            return;
        }
        setPhotos(prev => prev.map((p, i) => (i === selected ? { ...p, ...patch } : p)));
    };

    const removePhoto = (index) => {
        setPhotos(prev => {
            URL.revokeObjectURL(prev[index].url);
            return prev.filter((_, i) => i !== index);
        });
        setSelected(0);
        setError('');
    };

    const fileName = isSheet ? 'postmarked-sheet.png' : `postmarked-${slug(current?.place)}.png`;
    const download = () => preview.canvas && saveCanvas(preview.canvas, fileName);
    const onTear = () => {
        if (soundOn) playTear();
        download();
    };

    return (
        <div className="container-xl py-12 sm:py-16">
            <Link to="/lab" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
                <HugeiconsIcon icon={ArrowLeft01Icon} className="h-4 w-4" />
                Lab
            </Link>

            <div className="mt-4 mb-8 max-w-2xl">
                <h1 className="text-4xl sm:text-5xl leading-[1.05]">Postmarked</h1>
                <p className="section-lede mt-3">
                    Turn a trip photo into an engraved postage stamp, postmarked from where and when you took it.
                    The place and date come from the photo itself. Nothing leaves your device.
                </p>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-5 items-start">
                {/* Stage */}
                <div
                    className="space-y-4 lg:sticky lg:top-24"
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files); }}
                >
                    <div className={`surface p-2.5 transition-shadow ${dragOver ? 'shadow-[0_0_0_2px_hsl(var(--orange))]' : ''}`}>
                        {isSheet ? (
                            <div className="rounded-[14px] bg-[#efe7d5] p-4 sm:p-6 grid place-items-center">
                                {preview.src && <img src={preview.src} alt="Your sheet of stamps" className="max-h-[560px] w-auto max-w-full drop-shadow-[0_10px_18px_rgba(60,50,40,0.18)]" />}
                            </div>
                        ) : (
                            <TearStage src={preview.src} onTear={onTear} busy={rendering} />
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button onClick={download} className="btn-ink btn-ink-lg" disabled={!preview.canvas}>
                            <HugeiconsIcon icon={Download01Icon} className="h-5 w-5" />
                            {isSheet ? 'Download sheet' : 'Download PNG'}
                        </button>
                        <span className="text-sm text-muted-foreground">
                            {isSheet ? 'One image with every stamp.' : `${STAMP_W * 3} × ${STAMP_H * 3}, transparent edges.`}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <form className="surface p-5 sm:p-6 space-y-7" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-3">
                        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-foreground/45">Photos</p>
                        <div className="flex flex-wrap gap-2">
                            {photos.map((p, i) => (
                                <div key={p.id} className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setSelected(i)}
                                        aria-pressed={i === selected}
                                        aria-label={`Edit stamp ${i + 1}${p.place ? `, ${p.place}` : ''}`}
                                        className={`block h-16 w-14 rounded-[8px] overflow-hidden bg-white transition-shadow ${i === selected ? 'shadow-[0_0_0_2px_hsl(var(--orange))]' : 'shadow-[var(--shadow-soft)]'}`}
                                    >
                                        <img src={p.url} alt="" className="h-full w-full object-cover" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => removePhoto(i)}
                                        aria-label="Remove photo"
                                        className="absolute -top-1.5 -right-1.5 grid place-items-center h-5 w-5 rounded-full bg-[#3c3a38] text-white shadow"
                                    >
                                        <HugeiconsIcon icon={Cancel01Icon} className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                            {photos.length < MAX_PHOTOS && (
                                <button
                                    type="button"
                                    onClick={() => fileRef.current?.click()}
                                    className="grid place-items-center h-16 w-14 rounded-[8px] border-2 border-dashed border-foreground/20 text-foreground/50 hover:text-foreground hover:border-foreground/40 transition-colors"
                                    aria-label="Add photos"
                                >
                                    <HugeiconsIcon icon={Add01Icon} className="h-5 w-5" />
                                </button>
                            )}
                            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ''; }} />
                        </div>
                        <p className="text-xs text-muted-foreground leading-5">
                            {photos.length
                                ? `Add up to ${MAX_PHOTOS} to make a sheet.`
                                : 'Drop a photo anywhere on the stamp, or add one here. Add several to make a sheet.'}
                        </p>
                        {error && <p className="text-xs font-semibold text-[#b1243d]">{error}</p>}
                    </div>

                    {current && (
                        <div className="space-y-4">
                            <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-foreground/45">
                                {isSheet ? `Stamp ${selected + 1}` : 'Postmark'}
                            </p>
                            {photos.length > 0 && (
                                <p className="flex items-start gap-1.5 text-xs text-muted-foreground leading-5">
                                    <HugeiconsIcon icon={Location01Icon} className="h-3.5 w-3.5 mt-0.5 flex-shrink-0" />
                                    {current.hasGps
                                        ? 'Place found in the photo. Edit it if it’s off.'
                                        : 'No location in this photo. Type where it was taken.'}
                                </p>
                            )}
                            <div className="grid grid-cols-2 gap-3">
                                <label className="block">
                                    <span className="block text-sm font-bold mb-1.5">Place</span>
                                    <input className="field" value={current.place} maxLength={24} placeholder="Lisbon" onChange={(e) => updateCurrent({ place: e.target.value })} />
                                </label>
                                <label className="block">
                                    <span className="block text-sm font-bold mb-1.5">Country</span>
                                    <input className="field" value={current.country} maxLength={24} placeholder="Portugal" onChange={(e) => updateCurrent({ country: e.target.value })} />
                                </label>
                            </div>
                            <label className="block">
                                <span className="flex items-baseline justify-between mb-1.5">
                                    <span className="text-sm font-bold">Date</span>
                                    {photos.length > 0 && !current.hasDate && <span className="text-xs text-muted-foreground">From the file, not the photo</span>}
                                </span>
                                <input type="date" className="field" value={current.date} onChange={(e) => updateCurrent({ date: e.target.value })} />
                            </label>
                        </div>
                    )}

                    <div className="space-y-4">
                        <p className="text-[11px] font-bold tracking-[0.18em] uppercase text-foreground/45">Printing</p>
                        <div>
                            <span className="block text-sm font-bold mb-1.5">Ink</span>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(INKS).map(([key, { label, color }]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        onClick={() => setInk(key)}
                                        aria-pressed={ink === key}
                                        title={label}
                                        className={`flex items-center gap-2 rounded-full pl-1.5 pr-3 py-1.5 text-[13px] font-bold bg-white transition-shadow ${ink === key ? 'shadow-[0_0_0_2px_#3c3a38]' : 'shadow-[var(--shadow-soft)]'}`}
                                    >
                                        <span className="h-5 w-5 rounded-full shadow-[inset_0_-2px_2px_rgba(0,0,0,0.2)]" style={{ background: color }} />
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-[110px_1fr] gap-3 items-end">
                            <label className="block">
                                <span className="block text-sm font-bold mb-1.5">Value</span>
                                <input className="field" value={value} maxLength={6} onChange={(e) => setValue(e.target.value)} />
                            </label>
                            <label className="flex items-center gap-2.5 text-sm font-bold cursor-pointer select-none pb-3">
                                <input type="checkbox" className="h-4 w-4 accent-[#3c3a38]" checked={postmark} onChange={(e) => setPostmark(e.target.checked)} />
                                Postmark
                            </label>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StampTool;
