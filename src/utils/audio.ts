// Web Audio API Synthesizer for Electronic Ballot & Campaign Jingle

let sharedAudioCtx: AudioContext | null = null;

export const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      sharedAudioCtx = new AudioCtx();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
};

// Play realistic TSE keyboard tactile beep
export const playKeypadBeep = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(850, ctx.currentTime);
    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.07);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
  } catch {
    // fallback
  }
};

// Play official TSE Urna Eletrônica confirmation sequence ("pi-pi-pi-pi-piiii")
export const playUrnaConfirmationTone = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';

    // Sequence: 900Hz short beep then prominent 1220Hz confirmation tone
    osc.frequency.setValueAtTime(920, now);
    osc.frequency.setValueAtTime(920, now + 0.16);
    osc.frequency.setValueAtTime(1240, now + 0.22);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.setValueAtTime(0.14, now + 0.22);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 1.4);
  } catch {
    // fallback
  }
};

// Synthesize energetic Brazilian campaign jingle fanfare ("Vem com o PRO, 77!")
let jingleTimeoutIds: number[] = [];
let isJingleActive = false;

export const playCampaignJingle = (onEnd?: () => void) => {
  stopCampaignJingle();
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    isJingleActive = true;

    // Notes sequence: [pitch Hz, duration ms, delay ms]
    // Energetic brass cadence: G4 -> C5 -> E5 -> G5 -> E5 -> G5
    const notes: [number, number, number][] = [
      [392.00, 180, 0],     // G4
      [523.25, 220, 200],   // C5
      [659.25, 220, 440],   // E5
      [783.99, 380, 680],   // G5 (forte)
      [659.25, 180, 1100],  // E5
      [783.99, 450, 1300],  // G5 (sustained fanfare)
      [1046.50, 600, 1780], // C6 (triumphant climax)
    ];

    const startTime = ctx.currentTime;

    notes.forEach(([freq, dur, delay]) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, startTime + delay / 1000);

      // Lowpass filter to make it sound like a brass ensemble
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1800, startTime + delay / 1000);

      gain.gain.setValueAtTime(0.001, startTime + delay / 1000);
      gain.gain.linearRampToValueAtTime(0.12, startTime + delay / 1000 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + (delay + dur) / 1000);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime + delay / 1000);
      osc.stop(startTime + (delay + dur) / 1000);
    });

    const totalDur = 2500;
    const tid = window.setTimeout(() => {
      isJingleActive = false;
      if (onEnd) onEnd();
    }, totalDur);
    jingleTimeoutIds.push(tid);
  } catch {
    isJingleActive = false;
    if (onEnd) onEnd();
  }
};

export const stopCampaignJingle = () => {
  jingleTimeoutIds.forEach((id) => clearTimeout(id));
  jingleTimeoutIds = [];
  isJingleActive = false;
};

export const isJinglePlaying = () => isJingleActive;
