import { useState, useEffect, useContext } from "react";
import { withRouter, useParams } from "react-router-dom";

import { shuffle } from "../../services/utils";

import SpellWord from "../spell/SpellWord";
import SpellFeedback from "../spell/SpellFeedback";
import SpellTextInput from "../spell/SpellTextInput";
import api from "../../services/api";

import AuthContext from "../../contexts/AuthContext";
import NavContext from "../../contexts/NavContext";

const Spell = (props) => {
  const [status, setStatus] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { setPage } = useContext(NavContext);

  useEffect(() => {
    setPage("spell");

    return () => setPage(null);
  }, []); // eslint-disable-line

  useEffect(() => {
    const getWordBag = async () => {
      try {
        const response = await api.getWordBag(id);

        const {
          words,
          consecutive_correct: consecutiveCorrect,
          title,
        } = response.data.data;

        let wordList = [];

        for (let i = 0; i < consecutiveCorrect; i++) {
          wordList.push(...shuffle(words));
        }

        setStatus({
          attempts: [],
          wordList,
          stage: "pre",
          isCorrect: false,
          currentWordIdx: 0,
          currentWord: wordList[0],
          consecutiveCorrect,
          title,
        });
      } catch (err) {
        console.log(err.message);
      }
    };
    getWordBag();
  }, [id]);

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

  const handleContinue = async () => {
    const currentWordIdx = status.currentWordIdx + 1;
    const currentWord = status.wordList[currentWordIdx];

    if (currentWordIdx === status.wordList.length) {
      try {
        await api.savePractice({
          wordBag: id,
          attempts: status.attempts,
          user: user ? user.id : null,
          consecutive_correct: status.consecutiveCorrect,
        });

        props.history.push({
          pathname: "/results",
          state: { attempts: status.attempts },
        });

        return;
      } catch (err) {
        console.log(err.message);
        return;
      }
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
          <div>
            <h1>{status.title}</h1>
            <button
              className="text-3xl text-white border rounded-xl py-4 px-8 shadow-xl bg-purple-600 focus:outline-none"
              onClick={handleStart}
            >
              Start Practice
            </button>
          </div>
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
