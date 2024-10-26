import React, { useState } from "react";
import module from "./table.module.css";
import buildingImage from "../../assets/images/BuildingI012k.png";
import { updateConsumptionRecords } from "API/putAPI";
import { useSelector } from "react-redux";

function ApprovalTable({ category, data, setIsDataUpdated }) {
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const handleRowHover = (index) => {
    setHoveredRowIndex(index);
  };
  console.log(data);

  const token =
    useSelector((state) => state.login.access) ||
    localStorage.getItem("access");

  const updatedata = async (data, id) => {
    await updateConsumptionRecords(token, data, id).then(() =>
      alert("Status has been updated successfully")
    );
    setIsDataUpdated(true); // Notify parent component to fetch updated data
  };

  const handleCheckboxChange = (id, isApproved) => {
    const approval = isApproved === 0 ? "rejected" : "approved";
    const result = window.confirm(
      "Are you sure to update the Approval status?"
    );
    if (result) {
      const updatedrecords = data.map((records) => {
        if (records.id === id) {
          const updatedRecords = {
            arppoval_status: approval,
            item: records.item,
            i_type: records.i_type,
          };
          updatedata(updatedRecords, id);
          return { ...records, status: (records.arppoval_status = approval) };
        }
      });
    }
  };

  const handleRowLeave = () => {
    setHoveredRowIndex(null);
  };

  let filteredTable;
  switch (category) {
    case "pending":
      filteredTable = data.filter(
        (item) => item.status.toLowerCase() === "pending"
      );
      break;
    case "rejected":
      filteredTable = data.filter(
        (item) => item.status.toLowerCase() === "rejected"
      );
      break;
    case "approved":
      filteredTable = data.filter(
        (item) => item.status.toLowerCase() === "approved"
      );
      break;
    default:
      filteredTable = data;
  }
  return (
    <div className={module.tableBox}>
      <div className={`${module.table_row} ${module.header_row}`}>
        <div className={module.table_cell}>BLOCK-LEVEL</div>
        <div className={module.table_cell}>STAGE </div>
        <div className={module.table_cell}>SUBSTAGE </div>
        <div className={module.table_cell}>QUANTITY</div>
        <div className={module.table_cell}>STATUS</div>
        <div className={module.table_cell}>DATE&TIME </div>
        <div className={module.table_cell}>APPROVAL</div>
      </div>

      {filteredTable.map((item, index) => (
        <div
          key={item.id} // Add a key for better performance
          className={module.table_row}
          onMouseEnter={() => handleRowHover(index)}
          onMouseLeave={handleRowLeave}
        >
          <div className={module.table_cell} style={{ cursor: "pointer" }}>
            {item.blockTitle} & {item.levelTitle}
          </div>
          <div className={module.table_cell} style={{ fontWeight: "600" }}>
            {item.stageTitle}
          </div>
          <div className={module.table_cell} style={{ fontWeight: "600" }}>
            {item.substageTitle}
          </div>
          <div
            className={module.table_cell}
            style={{ color: "#6345ea", fontSize: "25px" }}
          >
            {item.quantity}
            <p style={{ fontSize: "18px" }}>{item.units}</p>
          </div>
          <div className={module.table_cell} style={{ color: "orange" }}>
            {item.status}
          </div>
          <div className={module.table_cell}>{item.date}</div>
          <div className={module.table_cell}>
            <input
              type="checkbox"
              className={module.resolved_checkbox}
              onChange={() => handleCheckboxChange(item.id, 1)}
              checked={item.status === "approved"}
            />
            <input
              type="checkbox"
              className={module.resolved_checkbox}
              onChange={() => handleCheckboxChange(item.id, 0)}
              checked={item.status === "rejected"}
            />
          </div>
          <div className={module.additional_content}>
            {/* Additional content for extended height */}
            <div className={module.additional_content_data}>
              <img src={buildingImage} alt="Additional Content" />
              <img src={buildingImage} alt="Additional Content" />
              <img src={buildingImage} alt="Additional Content" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApprovalTable;
