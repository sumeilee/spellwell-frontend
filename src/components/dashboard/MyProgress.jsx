import { useEffect, useState, useContext } from "react";

import api from "../../services/api";

import WordPie from "./WordPie";
import AuthContext from "../../contexts/AuthContext";

const MyProgress = () => {
  const [aggResults, setAggResults] = useState([]);
  //const [sortBy, setSortBy] = useState("word");
  const { user } = useContext(AuthContext);

  // const sortObjArray = (arr, sortBy, order = "ascending") => {
  //   console.log(arr);
  //   const tmp = [...arr];
  //   if (sortBy === "word") {
  //     if (order === "ascending") {
  //       tmp.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  //     } else {
  //       tmp.sort((a, b) => (a[sortBy] > b[sortBy] ? -1 : 1));
  //     }
  //   }

  //   return tmp;
  // };

  const aggregateResults = (practices) => {
    const res = {};

    practices.forEach(({ results }) => {
      results.forEach((result) => {
        const word = result["word"];
        if (!Object.keys(res).includes(word)) {
          res[word] = {
            numAttempts: 0,
            numCorrect: 0,
            numMissed: 0,
          };
        }

        res[word].numAttempts = res[word].numAttempts + result.numAttempts;
        res[word].numCorrect = res[word].numCorrect + result.numCorrect;
        res[word].numMissed =
          res[word].numMissed + (result.numAttempts - result.numCorrect);
      });
    });

    Object.keys(res).forEach((word) => {
      res[word].accuracy = (res[word].numCorrect / res[word].numAttempts) * 100;
    });

    const data = Object.keys(res).map((key) => ({
      word: key,
      data: [
        {
          name: "Correct",
          value: res[key].numCorrect,
        },
        {
          name: "Missed",
          value: res[key].numMissed,
        },
      ],
    }));

    data.sort((a, b) => (a.word > b.word ? 1 : -1));
    //const sortedData = sortObjArray(data, sortBy);
    //console.log(sortedData);

    return data;
  };

  const getPracticeList = async () => {
    try {
      const response = await api.getPracticeList(user.id);
      const practices = response.data.data;
      const results = aggregateResults(practices);
      setAggResults(results);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getPracticeList();
  }, [user]); // eslint-disable-line

  // useEffect(() => {
  //   if (aggResults) {
  //     let order = "ascending";

  //     if (sortBy !== "word") {
  //       order = "descending";
  //     }
  //     const tmp = sortObjArray(aggResults, sortBy, order);
  //     console.log(tmp);
  //     setAggResults(tmp);
  //   }
  // }, [sortBy]);

  // const handleSelect = (e) => {
  //   const sortKey = e.target.value;
  //   setSortBy(sortKey);
  // };

  return (
    <div className="w-full flex justify-center p-2 pb-4">
      {aggResults.length > 0 && (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
            {aggResults.map((res, i) => (
              <div key={i} className="pb-2">
                <WordPie word={res.word} data={res.data} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProgress;

/*
<form>
  <label htmlFor="sortBy">Sort By</label>
  <select
    id="sortBy"
    className="border p-2 rounded-lg ml-2"
    onChange={handleSelect}
    value={sortBy}
  >
    <option value="word">Word</option>
    <option value="numCorrect">Number Correct</option>
    <option value="accuracy">Accuracy</option>
  </select>
</form>
*/
