import { useRef } from "react";

const SpellTextInput = ({ handleSubmit }) => {
  const inputEl = useRef(null);

  const handleSubmitAnswer = (e) => {
    e.preventDefault();

    const answer = e.target.answer.value;
    inputEl.current.value = "";

    handleSubmit(answer);
  };

  return (
    <form
      className="flex items-center justify-center p-4 mt-4"
      onSubmit={handleSubmitAnswer}
    >
      <input
        className="outline-none border-b-2 py-1 px-4 text-center text-xl tracking-wide"
        ref={inputEl}
        type="text"
        name="answer"
        autoFocus
      />
      <button type="submit">
        <i className="text-2xl text-gray-600 fas fa-arrow-circle-right" />
      </button>
    </form>
  );
};

export default SpellTextInput;
