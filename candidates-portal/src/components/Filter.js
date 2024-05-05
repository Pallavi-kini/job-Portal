import React from "react";
import "./Filter.css";

const Filter = (props) => {
  const handleInputChange = (event) => {
    props.handleInputChange(event);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit();
  };

  return (
    <div className="filter">
      <div className="filter-container">
        <h2>Filter</h2>
        <form onSubmit={handleSubmit}>
          <div className="form">
            <div>
              <label htmlFor="company name">Company Name</label>
              <input
                type="text"
                name="companyName"
                className="input"
                value={props.filter.companyName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="location">Location</label>
              <input
                type="text"
                name="location"
                className="input"
                value={props.filter.location}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="experience">Minimum experience</label>
              <input
                type="number"
                name="experience"
                className="input"
                value={props.filter.experience}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="role">Designation</label>
              <input
                type="text"
                name="role"
                className="input"
                value={props.filter.role}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <button type="submit" className="btn-click">
            Apply
          </button>
        </form>
      </div>
    </div>
  );
};

export default Filter;
