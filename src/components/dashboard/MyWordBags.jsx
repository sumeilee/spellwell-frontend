import { useEffect, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { CopyToClipboard } from "react-copy-to-clipboard";

import api from "../../services/api";

import AuthContext from "../../contexts/AuthContext";

const MyWordBags = (props) => {
  const [wordBags, setWordBags] = useState([]);
  const { user } = useContext(AuthContext);
  let tipRef = {};

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

  const handleDeleteBag = async (id) => {
    try {
      const response = await api.updateWordBag(id, {
        owner: null,
        updated_at: Date.now(),
      });

      if (response.status === 200) {
        getWordBagsByUser();
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="w-full flex justify-center px-6 pb-6">
      <div className="flex flex-col w-full margin-auto">
        {wordBags.map((bag, i) => (
          <div
            key={i}
            className="flex flex-col rounded-lg shadow-md overflow-hidden my-2"
          >
            <div className="flex w-full justify-between items-center px-4 py-2 bg-purple-500 text-white">
              <p className="text-lg font-semibold">{bag.title}</p>
              <div className="flex items-center">
                <Link to={`/spell/${bag._id}`}>
                  <i className="far fa-play-circle mx-2"></i>
                </Link>
                <p
                  data-tip="Link copied"
                  ref={(ref) => (tipRef[bag._id] = ref)}
                ></p>
                <ReactTooltip
                  afterShow={() => setTimeout(ReactTooltip.hide, 2000)}
                  offset={{ top: 5, right: 15 }}
                />
                <CopyToClipboard
                  text={`${process.env.REACT_APP_BASE_URL}/spell/${bag._id}`}
                  onCopy={() => ReactTooltip.show(tipRef[bag._id])}
                >
                  <i className="fas fa-share-alt cursor-pointer mx-2"></i>
                </CopyToClipboard>

                <button
                  name={bag._id}
                  onClick={() => props.handleEditClick(bag._id)}
                  className="focus:outline-none"
                >
                  <i className="far fa-edit mx-2"></i>
                </button>
                <button
                  onClick={() => handleDeleteBag(bag._id)}
                  className="focus:outline-none"
                >
                  <i className="far fa-trash-alt mx-2"></i>
                </button>
              </div>
            </div>

            <div className="w-full px-2 py-4 grid grid-cols-3 sm:grid-cols-4 ">
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

export default withRouter(MyWordBags);
