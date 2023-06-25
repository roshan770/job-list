import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filter, setFilter] = useState({
    position: "",
    timing: "",
  });

  useEffect(() => {
    // Fetch job list from the API
    axios
      .get(
        "https://storage.googleapis.com/programiz-static/hiring/software/job-listing-page-challenge/data.json"
      )
      .then((response) => {
        const data = response.data;
        setJobs(data || []);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleOpenFilter = () => {
    setIsFilterOpen(true);
  };

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  const handleFilterChange = (event) => {
    setFilter({
      ...filter,
      [event.target.name]: event.target.value,
    });
  };

  const handleClearFilter = () => {
    setFilter({
      position: "",
      timing: "",
    });
    setIsFilterOpen(false);
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filter.position === "" ||
        job.position.toLowerCase().includes(filter.position.toLowerCase())) &&
      (filter.timing === "" ||
        job.timing.toLowerCase().includes(filter.timing.toLowerCase()))
    );
  });

  const getRandomTiming = () => {
    const daysAgo = Math.floor(Math.random() * 10) + 1;
    return `${daysAgo}d ago`;
  };

  const getRandomCountry = () => {
    const country = ["USA Only", "Remote", "UK and Canada", "Asia"];
    const randomIndex = Math.floor(Math.random() * country.length);
    return country[randomIndex];
  };

  return (
    <div className="container">
      <div className="container2">
        <div className="section-block"></div>
        <div className="container3">
          <div className="container4">
            <h1>JOB LIST</h1>

            <div className="filter-section">
              <button className="filter-btn" onClick={handleOpenFilter}>
                Open Filter
              </button>
              <button className="clear-filter-btn" onClick={handleClearFilter}>
                Clear Filter
              </button>
            </div>
            {isFilterOpen && (
              <div className="filter-dialog">
                <div className="filter-dialog-content">
                  <label htmlFor="positionFilter">Filter by Position: </label>
                  <input
                    type="text"
                    id="positionFilter"
                    name="position"
                    value={filter.position}
                    onChange={handleFilterChange}
                  />
                  <label htmlFor="timingFilter">Filter by Timing: </label>
                  <input
                    type="text"
                    id="timingFilter"
                    name="timing"
                    value={filter.timing}
                    onChange={handleFilterChange}
                  />
                  <button
                    className="filter-action-btn"
                    onClick={handleCloseFilter}
                  >
                    Close Filter
                  </button>
                </div>
              </div>
            )}
          </div>
          <ul className="job-list">
            {filteredJobs.map((job, index) => (
              <li key={job.id}>
                <div className="name">
                  {job.company}

                  {index < 2 && (
                    <span
                      className={`label ${index === 0 ? "featured" : "new"}`}
                    >
                      {index === 0 ? "Featured" : "New"}
                    </span>
                  )}
                </div>

                <div className="job-info">
                  <img
                    src={job.company_logo}
                    alt={job.company}
                    className="company-logo"
                  />
                  <div className="title">{job.position}</div>
                  <div className="keywords">{job.keywords}</div>
                </div>
                <div className="timing">
                  {getRandomTiming()} - {job.timing} - {getRandomCountry()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
