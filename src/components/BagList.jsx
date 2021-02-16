import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

const BagList = () => {
  const [wordBags, setWordBags] = useState([]);

  const getWordBags = async () => {
    try {
      const response = await api.getWordBags();
      const bags = response.data.data;
      setWordBags(bags);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getWordBags();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center px-6 pb-6">
      <h1 className="text-2xl py-2">All WordBags</h1>
      <div className="flex flex-col w-full sm:w-2/3 max-w-md margin-auto">
        {wordBags.map((bag, i) => (
          <div
            key={i}
            className="flex flex-col rounded-lg shadow-md overflow-hidden my-2"
          >
            <div className="flex justify-between items-center px-4 py-2 bg-purple-500 text-white">
              <p className="text-lg font-semibold">{bag.title}</p>
              <Link to={`/spell/${bag._id}`}>
                <i className="far fa-play-circle mx-2"></i>
              </Link>
            </div>

            <div className="w-full px-2 py-2 grid grid-cols-3 sm:grid-cols-4 ">
              {bag.words.map((word, j) => (
                <p key={j} className="mx-4">
                  {word}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BagList;
