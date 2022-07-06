const synth = window.speechSynthesis;

export const utter = new SpeechSynthesisUtterance();
utter.rate = 0.8;

export const utterFeedback = new SpeechSynthesisUtterance();
utterFeedback.rate = 0.8;

let voices;

synth.onvoiceschanged = () => {
  voices = synth.getVoices();

  const enUS = voices.filter((voice) => voice.lang === 'en-US');
  const idx = Math.min(4, voices.length);
  utter.voice = enUS[idx];
  utterFeedback.voice = enUS[idx];
};

export default synth;
