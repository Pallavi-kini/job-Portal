import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../Assets/logoc.jpg";
import "./Dashboard.css";
import Filter from "./Filter";
import CircularProgress from "@mui/material/CircularProgress";

const Dashboard = () => {
  const [jobData, setjobData] = useState([]);
  const [page, setPage] = useState(1);
  const [showFilter, setshowFilter] = useState(false);
  const [overlayStyle, setoverlayStyle] = useState(true);
  const [isLoading, setisLoading] = useState(true);
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
        setisLoading(false);
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
      {isLoading ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <>
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
          <div className="show-filter">{showFilter ? <Filter /> : null}</div>

          <div className="card-structure">
            {jobData.map((item) => (
              <div className="card" key={item.jdUid}>
                <div className="card-details">
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="posted-date">
                      <span>
                        <i className="fa-solid fa-hourglass-end"></i>
                      </span>
                      <span>Posted 10 days ago</span>
                    </div>
                    <div>
                      <i class="fa-regular fa-bookmark"></i>
                    </div>
                  </div>
                  <div className="company-details">
                    <div>
                      <img className="logo" src={logo} alt="Logo" />
                    </div>
                    <div className="location">
                      <span>{item.companyName}</span>
                      <span>{item.jobRole} Engineer</span>
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <div>
                    Estimated Salary {item.minJdSalary ? item.minJdSalary : 50}
                    <span>&#36;</span> -{" "}
                    {item.maxJdSalary ? item.maxJdSalary : 100}
                    <span>&#36;</span>
                    <i
                      class="fa-solid fa-square-check"
                      style={{ color: "#088761" }}
                    ></i>
                  </div>
                  <div className="general-padding">
                    <h3>About Company:</h3>
                    <div className="general-padding">
                      <div>About Us:</div>
                      <div className="job-desc">
                        <div className="content">
                          {item.jobDetailsFromCompany}
                        </div>
                        <div className="content overlay">
                          <span style={{ cursor: "pointer" }}>View Job</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    Minimum experience {item.minExp ? item.minExp : 1} years
                  </div>
                  <div className="general-padding">
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
        </>
      )}
    </div>
  );
};

export default Dashboard;
