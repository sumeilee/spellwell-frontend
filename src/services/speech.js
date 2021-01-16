const synth = window.speechSynthesis;

export const utter = new SpeechSynthesisUtterance();
utter.rate = 0.8;

export const utterFeedback = new SpeechSynthesisUtterance();
utterFeedback.rate = 0.8;

let voices;

synth.onvoiceschanged = () => {
  voices = synth.getVoices();
  // console.log(voices);

  utter.voice = voices[50];
  utterFeedback.voice = voices[50];
};

export default synth;
