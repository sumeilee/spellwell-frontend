import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";

import { shuffle } from "../../services/utils";

import SpellWord from "../spell/SpellWord";
import SpellFeedback from "../spell/SpellFeedback";
import SpellTextInput from "../spell/SpellTextInput";

const Spell = (props) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const data = {
      consecutiveCorrect: 2,
      words: ["pulse", "tiger", "moon"],
    };

    let wordList = [];

    for (let i = 0; i < data.consecutiveCorrect; i++) {
      wordList.push(...shuffle(data.words));
    }

    setStatus({
      attempts: [],
      wordList,
      stage: "pre",
      isCorrect: false,
      currentWordIdx: 0,
      currentWord: wordList[0],
    });
  }, []);

  const checkAnswer = (answer) => {
    return status.currentWord.toLowerCase() === answer.toLowerCase();
  };

  const processAnswer = (answer) => {
    let wordList = status.wordList;
    const stage = "feedback";

    const isCorrect = checkAnswer(answer);

    if (!isCorrect) {
      wordList = wordList.concat(status.currentWord);
    }

    setStatus({
      ...status,
      attempts: status.attempts.concat({
        word: status.currentWord,
        answer: answer,
        isCorrect,
        responseTime: null,
      }),
      wordList,
      stage,
      isCorrect,
    });
  };

  const handleSubmit = (answer) => {
    if (status.stage === "spell") {
      processAnswer(answer);
    } else if (status.stage === "feedback") {
      setStatus({
        ...status,
        isCorrect: checkAnswer(answer),
      });
    }
  };

  const handleContinue = () => {
    const currentWordIdx = status.currentWordIdx + 1;
    const currentWord = status.wordList[currentWordIdx];

    if (currentWordIdx === status.wordList.length) {
      props.history.push({
        pathname: "/results",
        state: { attempts: status.attempts },
      });
      return;
    }

    setStatus({
      ...status,
      stage: "spell",
      currentWordIdx,
      currentWord,
    });
  };

  const handleStart = () => {
    setStatus({
      ...status,
      stage: "spell",
    });
  };

  return (
    <div className="h-full w-full flex items-center justify-center">
      {status ? (
        status.stage === "pre" ? (
          <button
            className="text-3xl text-white border rounded-xl py-4 px-8 shadow-xl bg-purple-600 focus:outline-none"
            onClick={handleStart}
          >
            Start Practice
          </button>
        ) : (
          <div className="h-32">
            {
              {
                spell: <SpellWord word={status.currentWord} />,
                feedback: (
                  <SpellFeedback
                    word={status.currentWord}
                    isCorrect={status.isCorrect}
                    handleContinue={handleContinue}
                  />
                ),
              }[status.stage]
            }

            <SpellTextInput handleSubmit={handleSubmit} />
          </div>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default withRouter(Spell);
