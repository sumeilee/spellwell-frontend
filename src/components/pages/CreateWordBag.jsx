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

    console.log(e.target.value);

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
          console.log(response.data);
          if (user) {
            props.history.push("/dashboard");
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
    <div className="p-10">
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          className="py-2 px-4 border focus:outline-none"
          value={fields.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="minCorrect">Consecutive Correct</label>
        <input
          type="text"
          name="consecutive_correct"
          id="minCorrect"
          className="py-2 px-4 border focus:outline-none"
          value={fields.consecutive_correct}
          onChange={handleInputChange}
        />
      </div>
      <div>
        {Object.keys(wordBag).length > 0 && (
          <div>
            {Object.keys(wordBag).map((fieldName, idx) => (
              <div className="flex p-2" key={idx}>
                <input
                  className="w-40 py-2 px-4 border focus:outline-none"
                  type="text"
                  name={fieldName}
                  value={wordBag[fieldName]}
                  onChange={handleInputChange}
                />
                <button
                  className="cursor-pointer"
                  name={fieldName}
                  onClick={handleRemoveWord}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        <div>
          <form onSubmit={handleAddWord}>
            <input
              className="w-40 py-2 px-4 border focus:outline-none"
              type="text"
              name="word"
              autoFocus
            />
            <button className="cursor-pointer" type="submit">
              +
            </button>
          </form>
        </div>

        <button
          className="text-md text-white border rounded-xl py-2 px-4 mt-4 shadow-xl bg-purple-600 focus:outline-none"
          onClick={handleCreateList}
        >
          Create Word Bag
        </button>
      </div>
    </div>
  );
};

export default withRouter(CreateWordBag);
