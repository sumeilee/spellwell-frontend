import { useState, useEffect } from "react";

import { withRouter } from "react-router-dom";

const Results = (props) => {
  const [results, setResults] = useState(null);

  const getResults = (attempts) => {
    const res = {};

    const words = [...new Set(attempts.map((attempt) => attempt.word))];

    words.forEach((word) => {
      const wordAttempts = attempts.filter((attempt) => attempt.word === word);
      const correctAttempts = wordAttempts.filter(
        (attempt) => attempt.isCorrect
      );

      const numAttempts = wordAttempts.length;
      const numCorrect = correctAttempts.length;

      res[word] = {
        numAttempts,
        numCorrect,
        accuracy: (numCorrect / numAttempts) * 100,
      };
    });

    return res;
  };

  useEffect(() => {
    const attempts = props.location.state.attempts;
    const res = getResults(attempts);

    setResults(res);
  }, [props.location.state.attempts]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <h3 className="text-2xl">Here's how you did</h3>
      <div className="mt-4">
        {results &&
          Object.keys(results).map((key, idx) => {
            return (
              <div key={idx}>
                <p>
                  {key}: {Math.round(results[key].accuracy)}%
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default withRouter(Results);
