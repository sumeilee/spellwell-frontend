import { useEffect, useState } from "react";
import { useParams, withRouter } from "react-router-dom";

import MyProgress from "../dashboard/MyProgress";
import MyPractices from "../dashboard/MyPractices";
import WordBagManager from "../dashboard/WordBagManager";

const DashboardPill = (props) => {
  return (
    <button
      className={`px-2 py-1 mx-1 sm:py-2 sm:px-4 sm:mx-2 rounded-lg focus:outline-none ${
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

const Dashboard = (props) => {
  const [pill, setPill] = useState(null);
  const [toggle, setToggle] = useState(true);
  const { page } = useParams();

  useEffect(() => {
    handlePillClick(page ? page : "progress");
  }, [page]); // eslint-disable-line

  const handlePillClick = (tag) => {
    setPill(tag);
    setToggle(!toggle);
  };

  return (
    <div className="flex flex-col w-full justify-center items-center m-auto sm:w-2/3 max-w-xl">
      <h1 className="text-2xl py-2">My Dashboard</h1>
      <div className="flex justify-center w-full mt-2">
        <DashboardPill
          label="Progress"
          tag="progress"
          pill={pill}
          onClick={() => props.history.push("/dashboard/progress")}
          //onClick={() => handlePillClick("progress")}
        />
        <DashboardPill
          label="WordBags"
          tag="bag"
          pill={pill}
          onClick={() => props.history.push("/dashboard/bag")}
          //onClick={() => handlePillClick("bag")}
        />
        <DashboardPill
          label="Practices"
          tag="practice"
          pill={pill}
          onClick={() => props.history.push("/dashboard/practice")}
          //onClick={() => handlePillClick("practice")}
        />
      </div>
      <div className="mt-4 w-full">
        {
          {
            progress: <MyProgress />,
            bag: <WordBagManager toggle={toggle} />,
            practice: <MyPractices />,
          }[pill]
        }
      </div>
    </div>
  );
};

export default withRouter(Dashboard);
