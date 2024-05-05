import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReusableCard from "./ReusableCard";
import { remove } from "./store/saveSlice";
import nodata from "../Assets/nodata.jpg";
import { NavLink } from "react-router-dom";
import "./SavedItem.css";

const SavedItem = () => {
  const [save, setsave] = useState({});
  const counter = useSelector((state) => state.save);
  const [storedData, setstoredData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    setstoredData(counter);
  }, [counter]);

  const removeFromStore = (item) => {
    dispatch(remove(item.jdUid));
    setsave((prevItems) => ({
      ...prevItems,
      [item.jdUid]: false,
    }));
  };

  return (
    <div className="saved-container">
      <div style={{ display: "flex" }}>
        <div>
          <NavLink to={"/"}>
            <span style={{ cursor: "pointer" }}>
              <i className="fa-solid fa-circle-arrow-left"></i>
            </span>
          </NavLink>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <h2>Saved Items</h2>
        </div>
      </div>
      {storedData.length > 0 ? (
        <ReusableCard
          jobData={storedData}
          dashboard={true}
          saveToStore={removeFromStore}
          save={save}
        ></ReusableCard>
      ) : (
        <div className="no-item">
          <img src={nodata} alt="Nodata" />
          <h2>No Items To show</h2>
        </div>
      )}
    </div>
  );
};

export default SavedItem;
