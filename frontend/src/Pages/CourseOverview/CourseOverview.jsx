import React, { useEffect, useState } from "react";
import "./SciencePrograms.css"; // CSS file for styling
import { useParams } from "react-router-dom";
import axios from "axios";

const SciencePrograms = () => {
  const { displine } = useParams();
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [courseDetails, setCourseDetails] = useState(null);

  // Fetch list of programs
  const getApiData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/all-disciplines-course-by-disciplinename/${displine}`
      );
      setPrograms(res.data.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  // Fetch details of the selected program
  const fetchCourseDetails = async (programName) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/all-disciplines-course-details-by-course-name/${encodeURIComponent(
          programName
        )}`
      );
      setCourseDetails(res.data.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
    getApiData();
  }, [displine]);

  useEffect(() => {
    if (programs.length && !selectedProgram) {
      setSelectedProgram(programs[0]); // Default to the first program
    }
  }, [programs]);

  useEffect(() => {
    if (selectedProgram) {
      fetchCourseDetails(selectedProgram.DisciplinesCourseName);
    }
  }, [selectedProgram]);

  return (
    <div className="science-programs-container">
      <div className="sidebar">
        <div className="guideHeading text-center">
          <h2 className="fs-4">{displine}</h2>
        </div>
        <ul>
          {programs.length > 0 ? (
            programs.map((program, index) => (
              <li
                key={index}
                className={
                  selectedProgram?.DisciplinesCourseName ===
                    program.DisciplinesCourseName
                    ? "active"
                    : ""
                }
                onClick={() => setSelectedProgram(program)}
              >
                {program.DisciplinesCourseName} <span>➔</span>
              </li>
            ))
          ) : (
            <p>No programs available.</p>
          )}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {programs.length === 0 ? (
          <p>No programs available for the selected discipline.</p>
        ) : courseDetails ? (
          <div>
            <h2>{courseDetails.DisciplinesCourseName.DisciplinesCourseName}</h2>
            <p>{courseDetails.CourseOverView}</p>
            <h2>Students enrolled in the course are taught to:</h2>
            <ul>
              {courseDetails.Studentenrolledtaughtto && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: courseDetails.Studentenrolledtaughtto,
                  }}
                />
              )}
            </ul>
            <table>
              {courseDetails.table &&
                courseDetails.table.map((row, index) => (
                  <tr key={index}>
                    <td>{row.label}</td>
                    <td>{row.value}</td>
                  </tr>
                ))}
            </table>
          </div>
        ) : (
          <p>No course details available.</p>
        )}
      </div>
    </div>
  );
};

export default SciencePrograms;
