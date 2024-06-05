import React, { createContext, useContext, useState, useEffect } from "react";
import "./Dashboard.css";
import Table from "../Table/Table";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    username: "",
    noOfWs: 0,
    noOfImg: 0,
  });
  const [tableData, setTableData] = useState({
    uploadedImages: [],
  });
  const [isLoading, setIsLoading] = useState(true); // Flag for loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/pic/dashboard",
          { withCredentials: true }
        );
        setDashboardData({
          username: response.data.data.username,
          noOfWS: response.data.data.noOfWS,
          noOfImg: response.data.data.noOfImg,
        });

        setTableData({
          uploadedImages: response.data.data.recent,
          uploadedAt: response.data.data.uploadedAt,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false after data fetching
      }
    };

    setTimeout(fetchData, 4000); // Fetch data after 4 seconds
  }, []);

  return (
    <div className="bg-image rounded d-flex flex-column align-items-center justify-content-center">
          {isLoading ? (
            <>
              <div className="image-overlay">
        <div className="grid1 rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
          <h1 className="animated-text skeleton border-r">
            Welcome Back 
          </h1>
          <div className="row row1 justify-content-center box2">
            <div className="col mt-3 workspace1">
              <div className="rounded text-white text-center mt-3 p-1 small-grid-bg-s">
                <p className="workspace mb-0 skeleton border-r">
                  My workspaces - 
                </p>
              </div>
            </div>
            <div className="col mt-3 image1">
              <div className="rounded text-white text-center mt-3 p-1 small-grid-bg-s">
                <p className="image mb-0 skeleton border-r">
                  My images - 
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 padding-skeleton">
                        <div className="skeleton width-verysmall-d mt-5">
                          Upload Image
                        </div>
                        <div className="skeleton1 mt-2">
                  <div className="skeleton details-skeleton width-large">Table data1</div>
                  <div className="skeleton details-skeleton width-large">Table data2</div>
                  <div className="skeleton details-skeleton width-large">Table data3</div>
                </div>
                      </div>
      </div>
            </>
          ) : (
            <>
              <div className="image-overlay">
        <div className="grid1 rounded fixed top-0 left-0 right-0 z-10 text-center p-5">
          <h1 className="animated-text">
            Welcome Back {dashboardData.username}!!
          </h1>
          <div className="row row1 justify-content-center box2">
            <div className="col mt-3 workspace1">
              <div className="rounded text-white text-center mt-3 p-1 small-grid-bg">
                <p className="workspace mb-0">
                  My workspaces - {dashboardData.noOfWS}
                </p>
              </div>
            </div>
            <div className="col mt-3 image1">
              <div className="rounded text-white text-center mt-3 p-1 small-grid-bg">
                <p className="image mb-0">
                  My images - {dashboardData.noOfImg}
                </p>
              </div>
            </div>
          </div>
        </div>
        {!tableData.uploadedImages.length ? (
          <h3>No recently uploaded images !</h3>
        ) : (
          <>
            <h3>Recently Uploaded Images</h3>
            <div className="grid2 text-gray">
              {/* <Table /> */}
              <Table tableData={tableData} />
            </div>
          </>
        )}
      </div>
            </>
          )}
        </div>
  );
};

export default Dashboard;
