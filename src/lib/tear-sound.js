import { getAudioContext } from './sound-engine';

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
