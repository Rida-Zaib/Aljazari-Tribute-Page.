/**
 * Synthesizes a soft, realistic paper whoosh sound using Web Audio API
 * Built exclusively from filtered white noise with a smooth cosine window
 * Two series lowpass filters sweeping from 1400Hz down to 500Hz.
 * Zero oscillators, zero tones, zero transients.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playPageTurnSound(isMuted: boolean, variant: 'forward' | 'backward' | 'riffle' = 'forward'): void {
  if (isMuted) return;
  
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const duration = variant === 'riffle' ? 0.18 : (variant === 'forward' ? 0.28 : 0.25);
    const sampleRate = ctx.sampleRate;
    const frameCount = Math.floor(sampleRate * duration);
    const audioBuffer = ctx.createBuffer(1, frameCount, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    // Bake a smooth, gradual cosine attack (first ~35%) and smooth decay (last ~65%) directly into the samples
    const attackFrames = Math.floor(frameCount * 0.35);
    const decayFrames = frameCount - attackFrames;

    for (let i = 0; i < frameCount; i++) {
      // Pure random white noise
      const whiteNoise = (Math.random() * 2 - 1);
      let envelope = 1;

      if (i < attackFrames) {
        // Smooth gradual cosine rise from true zero
        const progress = i / attackFrames;
        envelope = 0.5 * (1 - Math.cos(Math.PI * progress));
      } else {
        // Smooth gradual cosine descent to true zero
        const progress = (i - attackFrames) / decayFrames;
        envelope = 0.5 * (1 + Math.cos(Math.PI * progress));
      }

      // Soft paper texture fluctuation
      const texture = 0.85 + 0.15 * Math.sin(i * 0.08);
      channelData[i] = whiteNoise * envelope * texture;
    }

    const source = ctx.createBufferSource();
    source.buffer = audioBuffer;

    // Two lowpass filters in series (1400Hz -> 500Hz sweep) - dull and breathy, no resonance
    const filter1 = ctx.createBiquadFilter();
    filter1.type = 'lowpass';
    filter1.Q.value = 0.45; // Below critical damping to prevent any resonant pitch
    filter1.frequency.setValueAtTime(1350, ctx.currentTime);
    filter1.frequency.exponentialRampToValueAtTime(520, ctx.currentTime + duration);

    const filter2 = ctx.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.Q.value = 0.45;
    filter2.frequency.setValueAtTime(1150, ctx.currentTime);
    filter2.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + duration);

    const gainNode = ctx.createGain();
    const peakGain = variant === 'riffle' ? 0.14 : 0.22;
    gainNode.gain.setValueAtTime(0.0001, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(peakGain, ctx.currentTime + duration * 0.35);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    source.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(gainNode);
    gainNode.connect(ctx.destination);

    source.start(ctx.currentTime);
  } catch (err) {
    console.debug('Audio playback note:', err);
  }
}
