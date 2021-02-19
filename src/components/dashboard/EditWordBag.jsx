import { useEffect, useState, useContext } from "react";

import AuthContext from "../../contexts/AuthContext";
import api from "../../services/api";

const getWordField = (word) => {
  return word.replace(" ", "");
};

const EditWordBag = (props) => {
  const [wordBag, setWordBag] = useState({});
  const [fields, setFields] = useState({
    title: "",
    consecutive_correct: 2,
  });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getWordBag = async () => {
      const response = await api.getWordBag(props.id);

      const { words, consecutive_correct, title } = response.data.data;

      setFields({ title, consecutive_correct });
      setWordBag(
        words.reduce((obj, word) => {
          obj[getWordField(word)] = word;
          return obj;
        }, {})
      );
    };
    getWordBag();
  }, [props.id]);

  const isWordInList = (word) => {
    // todo: make case-insensitive
    return Object.values(wordBag).includes(word);
  };

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    console.log(wordBag);

    if (Object.keys(fields).includes(fieldName)) {
      setFields({ ...fields, [fieldName]: value });
    } else {
      if (!isWordInList(value)) {
        setWordBag({ ...wordBag, [fieldName]: value });
      }
    }
  };

  const handleAddWord = (e) => {
    e.preventDefault();

    const word = e.target.word.value;
    e.target.word.value = "";

    if (word && !isWordInList(word)) {
      setWordBag({ ...wordBag, [getWordField(word)]: word });
    }
  };

  const handleRemoveWord = (e) => {
    const keyToRemove = e.target.name;
    console.log("removing " + keyToRemove);
    setWordBag(
      Object.keys(wordBag)
        .filter((key) => key !== keyToRemove)
        .reduce((obj, key) => {
          obj[key] = wordBag[key];
          return obj;
        }, {})
    );
  };

  const handleEditBag = async () => {
    const words = Object.values(wordBag);
    const { title, consecutive_correct } = fields;

    if (words.length > 0) {
      const data = {
        title,
        words,
        consecutive_correct,
        owner: user ? user.id : null,
      };

      try {
        const response = await api.updateWordBag(props.id, data);
        if (response.status === 200) {
          console.log(response.data);
          props.handleDoneClick();
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log("No words in bag");
    }
  };

  return (
    <div className="px-8 max-w-sm m-auto">
      <div className="flex flex-col">
        <label htmlFor="title" className="font-semibold ml-1">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          className="py-2 px-4 mt-1 border rounded-lg focus:outline-none"
          value={fields.title}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="minCorrect" className="font-semibold ml-1">
          Consecutive Correct
        </label>
        <input
          type="text"
          name="consecutive_correct"
          id="minCorrect"
          className="py-2 px-4 mt-1 border rounded-lg focus:outline-none"
          value={fields.consecutive_correct}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col mt-4">
        <p className="mb-1 font-semibold ml-1">Words</p>
        {Object.keys(wordBag).length > 0 && (
          <div className="flex flex-col">
            {Object.keys(wordBag).map((fieldName, idx) => (
              <div className="flex mb-4" key={idx}>
                <input
                  className="w-full py-2 px-4 border rounded-lg focus:outline-none"
                  type="text"
                  name={fieldName}
                  value={wordBag[fieldName]}
                  onChange={handleInputChange}
                />
                <button
                  className="focus:outline-none text-gray-700 w-12 px-2"
                  name={fieldName}
                  onClick={handleRemoveWord}
                >
                  <i className="far fa-trash-alt mx-2"></i>
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="w-full flex">
          <form onSubmit={handleAddWord} className="flex w-full">
            <input
              className="w-full py-2 px-4 border rounded-lg focus:outline-none"
              type="text"
              name="word"
              autoFocus
            />
            <button
              className="focus:outline-none text-gray-700 w-12 px-2"
              type="submit"
            >
              <i className="fas fa-plus"></i>
            </button>
          </form>
        </div>

        <div className="flex justify-center">
          <button
            className="text-md text-white border rounded-xl py-2 px-4 mt-8 mx-2 justify-self-autoshadow-xl bg-gray-500 focus:outline-none"
            onClick={props.handleDoneClick}
          >
            Cancel
          </button>
          <button
            className="text-md text-white border rounded-xl py-2 px-4 mt-8 mx-2 shadow-xl bg-purple-600 focus:outline-none"
            onClick={handleEditBag}
          >
            Update Word Bag
          </button>
        </div>
      </div>
    </div>
  );
};
export default EditWordBag;
