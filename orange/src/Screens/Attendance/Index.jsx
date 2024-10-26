import React, { useState, useEffect } from "react";
import QuickView from "../../Components/QuickView/Index";
import module from "./Attendance.module.css";
// import AttendanceTable from "./AttendanceTable";
import { useNavigate } from "react-router-dom";
import { getAttendance, getCategory, getTypes } from "API/getAPI";
// import CustomTable from "Components/Custom_Table/Index";
import AttendanceTable from "../../Components/Attendance_table/Index";
import { useSelector } from "react-redux";

function AttendanceScreen() {
  const [active, setActive] = useState("Category 350");
  const [displayData, setDisplayData] = useState("");
  const [type, setType] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const accessToken = localStorage.getItem("access");
  const navigate = useNavigate();
  const project = useSelector((state) => state.project.project);

  const handleClick = (category, data) => {
    setActive(category);
    setDisplayData(data);
  };

  useEffect(() => {
    fetchAttendance();
    fetchStafftype();
    fetchCategory();
  }, [project]);

  const fetchAttendance = async () => {
    const data = await getAttendance(accessToken, project);
    console.log("attendance", data);
  };

  const fetchStafftype = async () => {
    const data = await getTypes(accessToken, project);
    console.log("types", data);
    setType(data);
  };

  const fetchCategory = async () => {
    const data = await getCategory(accessToken, project);
    console.log("category ", data);
  };

  return (
    <div className={module.page_container}>
      <div className={module.heading_items}>
        <QuickView
          heading="Attendance"
          othersInfo={false}
          button={true}
          buttonTitle={"View Attendance"}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div className={module.attendance_container}>
          {/* <ul className={module.side_list_container}>
            <li>
              <h3>Unskilled Labour</h3>
              <li
                className={`${module.side_list_elements} ${
                  active === "Category 350" ? module.active : ""
                }`}
                onClick={() => handleClick("Category 350", "Unskilled")}
              >
                <h4 style={{ fontWeight: "600" }}>Category 350</h4>
                <p>35</p>
              </li>
              <li
                className={`${module.side_list_elements} ${
                  active === "Category 500" ? module.active : ""
                }`}
                onClick={() => handleClick("Category 500", "Unskilled")}
              >
                <h4 style={{ fontWeight: "600" }}>Category 500</h4>
                <p>20</p>
              </li>
            </li>
            <li>
              <h3>Skilled Labour</h3>
              <li
                className={`${module.side_list_elements} ${
                  active === "Carpenter Team" ? module.active : ""
                }`}
                onClick={() => handleClick("Carpenter Team", "Skilled")}
              >
                <h4 style={{ fontWeight: "600" }}>Carpenter team</h4>
                <p>13</p>
              </li>
            </li>
            <li>
              <h3>Vendors</h3>
              <li
                className={`${module.side_list_elements} ${
                  active === "JCB" ? module.active : ""
                }`}
                onClick={() => handleClick("JCB", "Vendor")}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <h4 style={{ fontWeight: "600" }}>JCB</h4>
                  <p>04</p>
                </div>
              </li>
            </li>
          </ul> */}

          <ul className={module.side_list_container}>
            {type.map((type, index) => (
              <li>
                <h3>{type.type}</h3>
                <li
                  className={`${module.side_list_elements} ${
                    active === "Category 350" ? module.active : ""
                  }`}
                  onClick={() => handleClick("Category 350", "Unskilled")}
                >
                  <h4 style={{ fontWeight: "600" }}>Category 350</h4>
                  <p>35</p>
                </li>
                <li
                  className={`${module.side_list_elements} ${
                    active === "Category 500" ? module.active : ""
                  }`}
                  onClick={() => handleClick("Category 500", "Unskilled")}
                >
                  <h4 style={{ fontWeight: "600" }}>Category 500</h4>
                  <p>20</p>
                </li>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ height: "100%", width: "85vw" }}>
          <AttendanceTable display={active} data={displayData} />
        </div>
      </div>
    </div>
  );
}

export default AttendanceScreen;
