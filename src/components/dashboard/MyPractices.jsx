import { useEffect, useState, useContext } from "react";

import api from "../../services/api";

import AuthContext from "../../contexts/AuthContext";

const MyPractices = () => {
  const [practiceList, setPracticeList] = useState([]);
  const { user } = useContext(AuthContext);

  const getPracticeList = async () => {
    try {
      const response = await api.getPracticeList(user.id);
      const practices = response.data.data;
      console.log(practices);
      setPracticeList(practices);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getPracticeList();
  }, [user]); // eslint-disable-line

  // const handleDeletePractice = async (e) => {
  //   const id = e.target.name;

  //   try {
  //     const response = await api.deletePractice(id);

  //     if (response.status === 200) {
  //       getPracticeList();
  //     }
  //   } catch (err) {
  //     console.log(err.message);
  //   }
  // };

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col w-2/3 max-w-md margin-auto">
        {practiceList.map((practice, i) => (
          <div key={i}>{practice.wordBag && practice.wordBag.title}</div>
        ))}
      </div>
    </div>
  );
};

export default MyPractices;
