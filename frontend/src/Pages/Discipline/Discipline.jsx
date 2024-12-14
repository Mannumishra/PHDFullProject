import React, { useEffect, useState } from "react";
import './discipline.css'
import axios from "axios";
import { Link } from "react-router-dom";
const Discipline = () => {
  const [focusAreas, setFocusAreas] = useState([])

  const getapiData = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/all-discipline")
      if (res.status === 200) {
        setFocusAreas(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getapiData()
  }, [])
  return (
    <section className="disciplines">
      <div className="documentShadow mx-auto">
        <h3>Disciplines</h3>
      </div>
      <div>
        <section className="focus-area-section py-5">
          <div className="container">
            <div className="row">
              {focusAreas.map((area, index) => (
                <div key={index} className="col-6 col-md-4 col-lg-2 mb-4">
                  <Link to={`/courses/course-overview/${area.DisciplinesName}`} className="text-decoration-none">
                    <div className="focus-area-tile text-center p-3 shadow-sm bg-white rounded">
                      <img
                        src={`http://localhost:8000/${area.DisciplinesLogo}`}
                        alt={area.DisciplinesName}
                        className="img-fluid mb-2"
                      />
                      <p className="m-0">{area.DisciplinesName}</p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Discipline;
