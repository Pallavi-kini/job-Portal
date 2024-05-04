import React, { useState } from "react";
import "./Filter.css";

const Filter = () => {
  const [filter, setfilter] = useState({
    companyName: "",
    location: "",
    experience: "",
    role: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setfilter((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log(e);
    e.preventDefault();
    console.log(filter);
  };
  return (
    <div className="filter">
      <div className="filter-container">
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label htmlFor="company name">Company Name</label>
            <input
              type="text"
              name="companyName"
              className="input"
              value={filter.companyName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              className="input"
              value={filter.location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="experience">Minimum experience</label>
            <input
              type="number"
              name="experience"
              className="input"
              value={filter.experience}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="role">Designation</label>
            <input
              type="text"
              name="role"
              className="input"
              value={filter.role}
              onChange={handleInputChange}
            />
          </div>
        </form>
        <div>
          <button type="submit" className="btn-click">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
