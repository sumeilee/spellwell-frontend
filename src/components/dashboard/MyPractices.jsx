import { useEffect, useState, useContext } from 'react';

import api from '../../services/api';

import AuthContext from '../../contexts/AuthContext';

const MyPractices = () => {
  const [practiceList, setPracticeList] = useState([]);
  const { user } = useContext(AuthContext);

  const groupByBag = (practices) => {
    const byBag = {};

    practices.forEach((practice) => {
      if (!practice.wordBag) {
        // if wordbag has been deleted
        return;
      }

      const bagId = practice.wordBag._id;
      if (!Object.keys(byBag).includes(bagId)) {
        byBag[bagId] = [];
      }

      // sort results by word
      practice.results.sort((a, b) => (a.word > b.word ? 1 : -1));

      byBag[bagId].push(practice);
    });

    return byBag;
  };

  const getPracticeList = async () => {
    try {
      const response = await api.getPracticeList(user.id);
      const practices = response.data.data;
      const practicesByBag = groupByBag(practices);
      setPracticeList(practicesByBag);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getPracticeList();
  }, [user]); // eslint-disable-line

  const handleDeletePractice = async (id) => {
    try {
      const response = await api.deletePractice(id);

      if (response.status === 200) {
        getPracticeList();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="w-full flex justify-center px-6 pb-6">
      <div className="flex flex-col w-full margin-auto">
        {practiceList &&
          Object.keys(practiceList).map((key, i) => (
            <div
              key={i}
              className="flex flex-col rounded-lg shadow-md overflow-hidden my-2"
            >
              <div className="flex justify-between items-center px-4 py-2 bg-purple-500 text-white">
                <p className="text-lg font-semibold">
                  {practiceList[key][0].wordBag.title}
                </p>
              </div>

              <div className="divide-y-2">
                {practiceList[key].map((practice, i) => (
                  <div key={i} className="pb-2">
                    <div className="flex justify-between px-4 py-2 mt-2">
                      <p>Practice {i + 1}</p>
                      <button
                        onClick={() => handleDeletePractice(practice._id)}
                        className="focus:outline-none"
                      >
                        <i className="far fa-trash-alt mx-2"></i>
                      </button>
                    </div>
                    <div className="w-full px-2 pb-2 grid grid-cols-3 sm:grid-cols-4 ">
                      {practice.results.map((result, j) => (
                        <div key={j} className="flex flex-col items-center">
                          <p
                            className={`${
                              result['accuracy'] < 100
                                ? 'text-yellow-700'
                                : 'text-green-700'
                            }`}
                          >
                            {result['numCorrect']}{' '}
                            <span className="text-xl">/</span>{' '}
                            {result['numAttempts']}{' '}
                          </p>
                          <p className="mx-4">{result['word']}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
/*

<div className="w-full px-2 py-4 grid grid-cols-3 sm:grid-cols-4 ">
                      {practice.wordBag.words.map((word, j) => (
                        
                        <p key={j} className="mx-4">
                          {word}
                        </p>
                        
                      ))}
                    </div>
<div className="w-full flex justify-center">
      <div className="flex flex-col w-2/3 max-w-md margin-auto">
        {practiceList &&
          practiceList.map(({ wordBag, results }, i) => (
            <div key={i}>
              <div>{wordBag && wordBag.title}</div>

              {Object.keys(results).map((key) => (
                <div>
                  {key}: {results[key].numCorrect}/{results[key].numAttempts} (
                  {Math.round(results[key].accuracy)} %)
                </div>
              ))}
            </div>
          ))}
      </div>
    </div>
*/
export default MyPractices;
