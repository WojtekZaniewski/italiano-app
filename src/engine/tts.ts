let italianVoice: SpeechSynthesisVoice | null = null;

function getItalianVoice(): SpeechSynthesisVoice | null {
  if (italianVoice) return italianVoice;
  const voices = speechSynthesis.getVoices();
  italianVoice = voices.find(v => v.lang.startsWith('it')) ||
                 voices.find(v => v.lang.includes('IT')) ||
                 null;
  return italianVoice;
}

// Preload voices
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  speechSynthesis.onvoiceschanged = () => { getItalianVoice(); };
  // Trigger initial load
  speechSynthesis.getVoices();
}

export function speakItalian(text: string, rate: number = 1.0): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!('speechSynthesis' in window)) {
      reject(new Error('Speech synthesis not supported'));
      return;
    }

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'it-IT';
    utterance.rate = rate;
    utterance.pitch = 1.0;

    const voice = getItalianVoice();
    if (voice) utterance.voice = voice;

    utterance.onend = () => resolve();
    utterance.onerror = (e) => reject(e);
    speechSynthesis.speak(utterance);
  });
}

export function stopSpeaking(): void {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel();
  }
}

export function isSpeechSupported(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

// Speech recognition for shadowing
export function startSpeechRecognition(
  onResult: (text: string, confidence: number) => void,
  onEnd: () => void,
): { stop: () => void } | null {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SpeechRecognition) return null;

  const recognition = new SpeechRecognition();
  recognition.lang = 'it-IT';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    const result = event.results[0][0];
    onResult(result.transcript, result.confidence);
  };

  recognition.onend = onEnd;
  recognition.onerror = () => onEnd();

  recognition.start();
  return { stop: () => recognition.stop() };
}
