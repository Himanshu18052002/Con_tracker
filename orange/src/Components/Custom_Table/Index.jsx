//for Inventory

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortDown,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";
import module from "./customTable.module.css";
import { useNavigate } from "react-router-dom";

const CustomTable = ({ data, headings }) => {
  const [sortOrder, setSortOrder] = useState("asc");
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const navigate = useNavigate();

  const handleSort = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  const renderSortIcon = () => {
    const icon =
      sortOrder === "asc" ? (
        <FontAwesomeIcon icon={faSortUp} />
      ) : (
        <FontAwesomeIcon icon={faSortDown} />
      );

    return (
      <button className={module.sort_button} onClick={handleSort}>
        {icon}
      </button>
    );
  };

  const handleRowClick = (materialName) => {
    navigate("/materialScreen", {
      state: {
        materialsWithSameName: data.filter(
          (data) => data.materialName === materialName
        ),
        purchaseRecord: data,
      },
    });
  };

  const handleRowHover = (index) => {
    setHoveredRowIndex(index);
  };

  const handleRowLeave = () => {
    setHoveredRowIndex(null);
  };

  return (
    <div className={module.custom_table}>
      <div className={module.table_row}>
        {headings.map((name, index) => (
          <div
            key={index}
            style={{ fontSize: "20px", color: "#8b8b8b" }}
            className={module.table_cell}
          >
            {name}
          </div>
        ))}
      </div>

      {data.map((rowData, index) => (
        <div
          key={index}
          className={`${module.table_row} ${
            hoveredRowIndex === index ? "module.hovered" : ""
          }`}
          onMouseEnter={() => handleRowHover(index)}
          onMouseLeave={handleRowLeave}
        >
          {rowData.materialName ? (
            <div
              className={module.table_cell}
              style={{ cursor: "pointer" }}
              onClick={() => handleRowClick(rowData.materialName)}
            >
              {rowData.materialName}
            </div>
          ) : null}
          <div className={module.table_cell}>{rowData.date}</div>
          <div className={module.table_cell}>{rowData.quantity}</div>
          <div className={module.table_cell}>{rowData.type}</div>
          <div className={module.table_cell}>{rowData.vendor}</div>
          <div className={module.table_cell}>{rowData.amount}</div>
          <div className={module.additional_content}>
            <div className={module.additional_content_data}>
              <img src={rowData.bill_image} alt="Additional Content" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomTable;
