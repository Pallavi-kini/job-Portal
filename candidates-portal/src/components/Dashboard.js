import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../Assets/logoc.jpg";
import "./Dashboard.css";
import Filter from "./Filter";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add, remove } from "./store/saveSlice";
import ReusableCard from "./ReusableCard";

const Dashboard = () => {
  const navigate = useNavigate();
  const [jobData, setjobData] = useState([]);
  const [page, setPage] = useState(1);
  const [showFilter, setshowFilter] = useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [save, setsave] = useState({});
  const [filter, setfilter] = useState({
    companyName: "",
    location: "",
    experience: "",
    role: "",
  });
  var limit = 12;
  const dispatch = useDispatch();

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

  // Implemented Infinite Scroll

  useEffect(() => {
    fetchApiData();
    const handleScroll = () => {
      setshowFilter(false);
      if (
        window.innerHeight + document.documentElement.scrollHeight + 1 >
        document.documentElement.scrollTop
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    limit = limit * page;
    fetchApiData();
    handleSubmit();
  }, [page]);

  const displayFilter = () => {
    setshowFilter(!showFilter);
  };

  const handleInputChange = (data) => {
    const { name, value } = data.target;
    setfilter((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const filteredJobs = jobData.filter((job) => {
      // Check if filter values are provided
      const filterCompanyName =
        filter.companyName && filter.companyName.toLowerCase();
      const filterLocation = filter.location && filter.location.toLowerCase();
      const filterRole = filter.role && filter.role.toLowerCase();
      const filterExperience =
        filter.experience !== undefined ? filter.experience : null;

      // Check if filter values match job properties, or if filter value is not provided
      const companyNameMatch =
        !filterCompanyName ||
        job.companyName.toLowerCase() === filterCompanyName;
      const locationMatch =
        !filterLocation || job.location.toLowerCase() === filterLocation;
      const roleMatch = !filterRole || job.jobRole.toLowerCase() === filterRole;
      const experienceMatch =
        filterExperience === null || job.minExp >= filterExperience;

      // Include the job only if all conditions match
      return companyNameMatch && locationMatch && roleMatch && experienceMatch;
    });
    // console.log(filteredJobs);
    setjobData(filteredJobs);
    if (filteredJobs.length > 0) {
      setjobData(filteredJobs);
    } else {
      fetchApiData();
    }
    setshowFilter(false);
  };

  const saveToStore = (item) => {
    if (save[item.jdUid]) {
      // If item is already saved, delete it
      dispatch(remove(item.jdUid));
      setsave((prevItems) => ({
        ...prevItems,
        [item.jdUid]: false,
      }));
    } else {
      // If item is not saved, add it
      dispatch(add(item));
      setsave((prevItems) => ({
        ...prevItems,
        [item.jdUid]: true,
      }));
    }
  };

  //Navigate to saved item page

  const routeToPageSave = () => {
    console.log("first");
    navigate("savedItem");
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
            <div className="filter-icon">
              <span
                onClick={displayFilter}
                style={{ display: "flex", gap: "6px" }}
              >
                <span>
                  <i className="fa-solid fa-filter"></i>
                </span>
                <span>Filter</span>
              </span>
              <span
                style={{ display: "flex", gap: "6px" }}
                onClick={routeToPageSave}
              >
                <span>
                  <i className="fa-solid fa-bookmark"></i>
                </span>
                <span>Saved Jobs</span>
              </span>
            </div>
          </div>
          <div className="show-filter">
            {showFilter ? (
              <Filter
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                filter={filter}
              />
            ) : null}
          </div>
          <ReusableCard
            jobData={jobData}
            saveToStore={saveToStore}
            save={save}
            dashboard={false}
          ></ReusableCard>
        </>
      )}
    </div>
  );
};

export default Dashboard;
