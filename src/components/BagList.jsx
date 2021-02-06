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
    <div className="w-full flex justify-center">
      <div className="flex flex-col w-2/3 max-w-md margin-auto">
        {wordBags.map((bag, i) => (
          <div
            key={i}
            className="flex flex-col px-4 py-2 my-2 rounded-lg shadow-md"
          >
            <div className="flex justify-between">
              <p>{bag.title}</p>
              <p className="cursor-pointer">{bag.words.length} words</p>
              <Link to={`/spell/${bag._id}`}>Practice</Link>
            </div>

            <div className="w-full flex px-2 py-2">
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
