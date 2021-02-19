import { useEffect, useRef } from "react";

import synth, { utter } from "../../services/speech";

const SpellWord = ({ word, audioData }) => {
  const audioRef = useRef(null);
  // useEffect(() => {
  //   utter.text = word;
  //   handlePlay();
  // }, [word]);

  const handlePlay = () => {
    //synth.speak(utter);
    audioRef.current.play();
  };

  return (
    <div
      className="h-full flex items-center justify-center cursor-pointer"
      onClick={handlePlay}
    >
      <audio
        ref={audioRef}
        autoPlay
        src={`data:audio/mpeg;base64,${audioData}`}
      ></audio>
      <i className="text-5xl text-gray-600 far fa-play-circle"></i>
    </div>
  );
};

export default SpellWord;
