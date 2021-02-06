import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import api from "../../services/api";

import AuthContext from "../../contexts/AuthContext";

const MyWordBags = (props) => {
  const [wordBags, setWordBags] = useState([]);
  const { user } = useContext(AuthContext);
  console.log(user);

  const getWordBagsByUser = async () => {
    try {
      const response = await api.getWordBagsByUser(user.id);
      const bags = response.data.data;
      setWordBags(bags);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getWordBagsByUser();
  }, [user]); // eslint-disable-line

  const handleDeleteBag = async (e) => {
    const id = e.target.name;

    try {
      const response = await api.deleteWordBag(id);

      if (response.status === 200) {
        getWordBagsByUser();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

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
              <button
                name={bag._id}
                onClick={() => props.handleEditClick(bag._id)}
              >
                Edit
              </button>
              <button name={bag._id} onClick={handleDeleteBag}>
                Delete
              </button>
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

export default MyWordBags;
