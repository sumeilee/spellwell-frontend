import { useState, useContext } from "react";
import { withRouter } from "react-router-dom";

import api from "../../services/api";

import AuthContext from "../../contexts/AuthContext";

const getWordField = (word) => {
  return word.replace(" ", "");
};

const CreateWordBag = (props) => {
  const [wordBag, setWordBag] = useState({});
  const [fields, setFields] = useState({
    title: "",
    consecutive_correct: 2,
  });
  const { user } = useContext(AuthContext);

  const isWordInList = (word) => {
    return Object.values(wordBag).includes(word);
  };

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

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
      setWordBag({
        ...wordBag,
        [getWordField(word)]: word,
      });
    }
  };

  const handleRemoveWord = (e) => {
    const keyToRemove = e.target.name;

    setWordBag(
      Object.keys(wordBag)
        .filter((key) => key !== keyToRemove)
        .reduce((obj, key) => {
          obj[key] = wordBag[key];
          return obj;
        }, {})
    );
  };

  const handleCreateList = async () => {
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
        const response = await api.createWordBag(data);
        if (response.status === 201) {
          if (user) {
            props.history.push("/dashboard/bag");
          } else {
            props.history.push("/");
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    } else {
      console.log("No words in bag");
    }
  };

  return (
    <div className="flex flex-col items-center px-8 py-4 max-w-sm m-auto">
      <h1 className="text-2xl py-2">Create a WordBag</h1>
      <div className="mt-4">
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

          <button
            className="text-md text-white border rounded-xl py-2 px-4 mt-8 shadow-xl bg-purple-600 focus:outline-none"
            onClick={handleCreateList}
          >
            Create Word Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CreateWordBag);
