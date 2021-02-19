import { useState, useEffect } from "react";

import { withRouter } from "react-router-dom";

const Results = (props) => {
  const [results, setResults] = useState(null);

  const getResults = (attempts) => {
    const words = [...new Set(attempts.map((attempt) => attempt.word))];

    const res = words.map((word) => {
      const wordAttempts = attempts.filter((attempt) => attempt.word === word);
      const correctAttempts = wordAttempts.filter(
        (attempt) => attempt.isCorrect
      );

      const numAttempts = wordAttempts.length;
      const numCorrect = correctAttempts.length;

      return {
        word,
        numAttempts,
        numCorrect,
        accuracy: (numCorrect / numAttempts) * 100,
      };
    });

    res.sort((a, b) => (a.word > b.word ? 1 : -1));

    return res;
  };

  useEffect(() => {
    const attempts = props.location.state.attempts;
    const res = getResults(attempts);

    setResults(res);
  }, [props.location.state.attempts]);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="w-72 flex flex-col items-center border rounded-lg overflow-hidden shadow-lg">
        <h3 className="w-full text-center text-xl font-semibold px-6 py-2 bg-purple-700 text-white">
          Score card
        </h3>
        <div className="w-full py-4">
          {results &&
            results.map((result, idx) => {
              return (
                <div key={idx} className="flex w-full items-center">
                  <p className="w-1/2 text-lg text-right px-2 py-2">
                    {result["word"]}:
                  </p>
                  <p
                    className={`w-1/2 text-left px-2 py-2 ${
                      result["accuracy"] < 100
                        ? "text-yellow-700"
                        : "text-green-700"
                    }`}
                  >
                    {result["numCorrect"]} <span className="text-xl">/</span>{" "}
                    {result["numAttempts"]}{" "}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Results);
