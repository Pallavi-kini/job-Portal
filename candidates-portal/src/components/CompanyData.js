import React, { useEffect, useState } from "react";
import "./CompanyData.css";

const CompanyData = () => {
  const [companyData, setcompanyData] = useState([]);

  useEffect(() => {
    const cdata = JSON.parse(localStorage.getItem("company"));
    setcompanyData(cdata);
  }, []);

  console.log(companyData);

  return (
    <div className="company-data">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Company Profile</h2>
      </div>
      <div className="card" key={companyData.jdUid}>
        <div className="card-details">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="posted-date">
              <span>
                <i className="fa-solid fa-hourglass-end"></i>
              </span>
              <span>Posted 10 days ago</span>
            </div>
            <div>
              <i className="fa-regular fa-bookmark"></i>
            </div>
          </div>
          <div className="company-details">
            <div>
              <img className="logo" src={companyData.logoUrl} alt="Logo" />
            </div>
            <div className="location">
              <span>{companyData.companyName}</span>
              <span>{companyData.jobRole} Engineer</span>
              <span>{companyData.location}</span>
            </div>
          </div>
          <div>
            Estimated Salary{" "}
            {companyData.minJdSalary ? companyData.minJdSalary : 50}
            <span>&#36;</span> -{" "}
            {companyData.maxJdSalary ? companyData.maxJdSalary : 100}
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
                <div className="content">
                  {companyData.jobDetailsFromCompany}
                </div>
              </div>
            </div>
          </div>
          <div>
            Recruites Profile:
            <span>
              <a href={companyData.jdLink}>{companyData.jdLink}</a>
            </span>
          </div>
          <div>
            Minimum experience {companyData.minExp ? companyData.minExp : 1}{" "}
            years
          </div>
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
    </div>
  );
};

export default CompanyData;
