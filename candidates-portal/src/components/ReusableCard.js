import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReusableCard.css";

const ReusableCard = (props) => {
  const navigate = useNavigate();

  const routeToPage = (data) => {
    localStorage.setItem("company", JSON.stringify(data));
    navigate("company");
  };

  const saveToStore = (data) => {
    props.saveToStore(data);
  };

  return (
    <div
      className={
        props.dashboard ? "card-structure-no-padding " : "card-structure"
      }
    >
      {props.jobData.map((item) => (
        <div className="card" key={item.jdUid}>
          <div className="card-details">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div className="posted-date">
                <span>
                  <i className="fa-solid fa-hourglass-end"></i>
                </span>
                <span>Posted 10 days ago</span>
              </div>
              <div className="filter-icon" onClick={() => saveToStore(item)}>
                {props.dashboard ? (
                  <>
                    <i className="fa-solid fa-bookmark"></i>
                  </>
                ) : props.save[item.jdUid] ? (
                  <i className="fa-solid fa-bookmark"></i>
                ) : (
                  <i className="fa-regular fa-bookmark"></i>
                )}
              </div>
            </div>
            <div className="company-details">
              <div>
                <img className="logo" src={item.logoUrl} alt="Logo" />
              </div>
              <div className="location">
                <span>{item.companyName}</span>
                <span
                  style={{ textTransform: "capitalize", fontWeight: "500" }}
                >
                  {item.jobRole} Engineer
                </span>
                <span style={{ fontSize: "14px" }}>{item.location}</span>
              </div>
            </div>
            <div>
              Estimated Salary {item.minJdSalary ? item.minJdSalary : 50}
              <span>&#36;</span> - {item.maxJdSalary ? item.maxJdSalary : 100}
              <span>&#36;</span>
              <i
                className="fa-solid fa-square-check"
                style={{ color: "#088761" }}
              ></i>
            </div>
            <div className="general-padding">
              <h3>About Company:</h3>
              <div className="general-padding">
                <div>About Us:</div>
                <div className="job-desc">
                  <div className="content">{item.jobDetailsFromCompany}</div>
                  <div className="content overlay">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => routeToPage(item)}
                    >
                      View Job
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div>Minimum experience {item.minExp ? item.minExp : 1} years</div>
            <div className="general-padding">
              <button type="submit" className="btn-apply">
                <span>
                  <i
                    className="fa-solid fa-bolt"
                    style={{ color: "#FFD43B" }}
                  ></i>
                </span>
                <span>Easy Apply</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReusableCard;
