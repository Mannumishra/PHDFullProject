import React, { useEffect, useState } from "react";
import axios from "axios";
import bannerImage from "../../Images/guides.png";
import { Link } from "react-router-dom";
import "./download.css";

const Downloads = () => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Fetching resources from the API
    const fetchResources = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/get-resources");
        setResources(response.data.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch resources.");
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (isLoading) {
    return <p className="text-center">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">Error: {error}</p>;
  }

  return (
    <>
      <div className="Homeabout">
        <h2 className="text-white text-center">Resources</h2>
        <div className="container mt-4">
          <div>
            {resources.map((resource) => (
              <div className="download-card" key={resource._id}>
                <p className="download_content">{resource.ResourcesName}</p>
                <div>
                  <a
                    href={`http://localhost:8000/${resource.ResourcesPdf}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <i style={{ color: "var(--color-blue)" }} className="bi bi-cloud-download"></i>{" "}
                    &nbsp; Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Downloads;
