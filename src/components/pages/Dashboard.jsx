import { useState } from "react";

import MyPractices from "../dashboard/MyPractices";
import WordBagManager from "../dashboard/WordBagManager";

const DashboardPill = (props) => {
  return (
    <button
      className={`px-4 py-2 mx-2 rounded-lg focus:outline-none ${
        props.tag === props.pill
          ? "bg-purple-700 text-white"
          : "border border-purple-700 text-purple-700"
      }`}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

const Dashboard = () => {
  const [pill, setPill] = useState("bag");
  const [toggle, setToggle] = useState(true);

  const handlePillClick = (tag) => {
    setPill(tag);
    setToggle(!toggle);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center m-auto sm:w-2/3">
      <div className="flex justify-center w-96">
        <DashboardPill
          label="My WordBags"
          tag="bag"
          pill={pill}
          onClick={() => handlePillClick("bag")}
        />
        <DashboardPill
          label="My Practices"
          tag="practice"
          pill={pill}
          onClick={() => handlePillClick("practice")}
        />
      </div>
      <div className="mt-8 w-full">
        {pill === "bag" ? <WordBagManager toggle={toggle} /> : <MyPractices />}
      </div>
    </div>
  );
};

export default Dashboard;
