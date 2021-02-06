import { useEffect, useState } from "react";

import MyWordBags from "./MyWordBags";
import EditWordBag from "./EditWordBag";

const WordBagManager = ({ toggle }) => {
  const [editBag, setEditBag] = useState(null);

  useEffect(() => {
    setEditBag(null);
  }, [toggle]);

  const handleEditClick = (bagId) => {
    setEditBag(bagId);
  };

  const handleDoneClick = () => {
    setEditBag(null);
  };

  return (
    <div>
      {!editBag ? (
        <MyWordBags handleEditClick={handleEditClick} />
      ) : (
        <EditWordBag id={editBag} handleDoneClick={handleDoneClick} />
      )}
    </div>
  );
};

export default WordBagManager;
