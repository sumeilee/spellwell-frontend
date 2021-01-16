import { useEffect } from "react";

import synth, { utter, utterFeedback } from "../../services/speech";

const SpellFeedback = ({ isCorrect, word, handleContinue }) => {
  const speakRedo = () => {
    utterFeedback.text = "Try again";
    synth.speak(utterFeedback);

    utter.text = word;
    synth.speak(utter);
  };

  const speakCorrect = () => {
    utterFeedback.text = "Correct";
    synth.speak(utterFeedback);
  };

  useEffect(() => {
    if (isCorrect) {
      speakCorrect();
      setTimeout(() => handleContinue(), 2000);
    } else {
      speakRedo();
    } // eslint-disable-next-line
  });

  return (
    <div className="h-full flex flex-col items-center justify-center">
      {isCorrect ? (
        <div
          className="text-5xl"
          role="img"
          aria-label="beaming face with smiling eyes"
        >
          {String.fromCodePoint("0x1F601")}
        </div>
      ) : (
        <>
          <div className="text-5xl" role="img" aria-label="thinking face">
            {String.fromCodePoint("0x1F914")}
          </div>
        </>
      )}
      <p className="text-3xl mt-4">{word}</p>
    </div>
  );
};

/* <i className="far fa-check-circle"></i> */

export default SpellFeedback;
