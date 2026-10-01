import { getAudioContext } from './sound-engine';

/* Synthesised paper peel: a slow, soft rustle that swells and fades as a
   whole sheet lifts away. Low-passed noise with a gentle filter sweep. */
export async function playPeel({ volume = 0.32, duration = 1.1 } = {}) {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') await ctx.resume();

        const length = Math.floor(ctx.sampleRate * duration);
        const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let grain = 0;
        for (let i = 0; i < length; i++) {
            const t = i / length;
            if (Math.random() < 0.004) grain = 0.8; // occasional fibre crackle
            grain *= 0.992;
            const envelope = Math.sin(Math.PI * Math.min(1, t * 1.15)) ** 1.5;
            data[i] = (Math.random() * 2 - 1) * (0.35 + grain) * envelope;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.Q.value = 0.6;
        filter.frequency.setValueAtTime(900, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(3200, ctx.currentTime + duration * 0.7);
        const gain = ctx.createGain();
        gain.gain.value = volume;

        source.connect(filter).connect(gain).connect(ctx.destination);
        source.start();
    } catch {
        // Audio unavailable: the peel still happens silently
    }
}

/* Synthesised paper-tear: a short burst of band-passed noise made of many
   tiny crackles (each perforation giving way), fading out. No audio file. */
export async function playTear({ volume = 0.5 } = {}) {
    try {
        const ctx = getAudioContext();
        if (ctx.state === 'suspended') await ctx.resume();

        const duration = 0.42;
        const length = Math.floor(ctx.sampleRate * duration);
        const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let crackle = 0;
        for (let i = 0; i < length; i++) {
            const t = i / length;
            // random crackles, denser at the start of the rip
            if (Math.random() < 0.012 * (1.4 - t)) crackle = 1;
            crackle *= 0.985;
            const envelope = Math.pow(1 - t, 1.8) * Math.min(1, t * 40);
            data[i] = (Math.random() * 2 - 1) * (0.25 + crackle) * envelope;
        }

        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const band = ctx.createBiquadFilter();
        band.type = 'bandpass';
        band.frequency.value = 2600;
        band.Q.value = 0.7;
        const high = ctx.createBiquadFilter();
        high.type = 'highpass';
        high.frequency.value = 700;
        const gain = ctx.createGain();
        gain.gain.value = volume;

        source.connect(band).connect(high).connect(gain).connect(ctx.destination);
        source.start();
    } catch {
        // Audio unavailable: tearing still works silently
    }
}
