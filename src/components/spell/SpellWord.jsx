import { useEffect } from "react";

import synth, { utter } from "../../services/speech";

const SpellWord = ({ word }) => {
  useEffect(() => {
    utter.text = word;
    handlePlay();
  }, [word]);

  const handlePlay = () => {
    synth.speak(utter);
  };

  return (
    <div
      className="h-full flex items-center justify-center cursor-pointer"
      onClick={handlePlay}
    >
      <i className="text-5xl text-gray-600 far fa-play-circle"></i>
    </div>
  );
};

export default SpellWord;
