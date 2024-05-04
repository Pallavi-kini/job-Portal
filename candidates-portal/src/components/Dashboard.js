import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../Assets/logoc.png";
import "./Dashboard.css";

const Dashboard = () => {
  const [jobData, setjobData] = useState([]);
  const [page, setPage] = useState(1);
  const [showFilter, setshowFilter] = useState(false);
  const [overlayStyle, setoverlayStyle] = useState(true);
  var limit = 12;

  const url = "https://api.weekday.technology/adhoc/getSampleJdJSON";

  const fetchApiData = () => {
    const request = {
      limit: limit,
      offset: 0,
    };
    axios
      .post(url, request)
      .then((res) => {
        setjobData(res.data.jdList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(jobData);

  useEffect(() => {
    fetchApiData();
    const handleScroll = () => {
      setshowFilter(false);
      setoverlayStyle(true);
      console.log("first");
      if (
        window.innerHeight + document.documentElement.scrollHeight + 1 >
        document.documentElement.scrollTop
      ) {
        setPage((prev) => prev + 1);
      }
    };
    console.log("stop");

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    limit = limit * page;
    fetchApiData();
  }, [page]);

  const displayFilter = () => {
    setshowFilter(!showFilter);
  };

  return (
    <div className="container">
      <div className="menu-content">
        <div className="filter-icon">
          <h3>Dashboard</h3>
        </div>
        <div className="filter-icon" onClick={displayFilter}>
          <span>
            <i className="fa-solid fa-filter"></i>
          </span>
          <span>Filter</span>
        </div>
      </div>
      {/* <div className="show-filter">{showFilter ? <Filter /> : null}</div> */}

      <div className="card-structure">
        {jobData.map((item) => (
          <div className="card" key={item.jdUid}>
            <div className="card-details">
              <div className="posted-date">
                <span>
                  <i className="fa-solid fa-hourglass-end"></i>
                  Posted 10 days ago
                </span>
              </div>
              <div className="company-details">
                <div>
                  <img className="logo" src={logo} alt="Logo" />
                </div>
                <div className="location">
                  <span>Fmana</span>
                  <span>{item.jobRole}</span>
                  <span>{item.location}</span>
                </div>
              </div>
              <div>
                Estimated Salary {item.minJdSalary ? item.minJdSalary : 50}
                <span>&#36;</span> - {item.maxJdSalary ? item.maxJdSalary : 100}
                <span>&#36;</span>
              </div>
              <div className="about-job">
                <h3>About Company:</h3>
                <div>
                  <div>About Us:</div>
                  <div className="job-desc">
                    <div className="content">{item.jobDetailsFromCompany}</div>
                    <div className="content overlay">
                      <span style={{ cursor: "pointer" }}>View Job</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                Minimum experience {item.minExp ? item.minExp : 1} years
              </div>
              <div>
                <button type="submit" className="btn-apply">
                  <span>
                    <i className="fa-solid fa-hourglass-end"></i>
                  </span>
                  <span>Easy Apply</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
