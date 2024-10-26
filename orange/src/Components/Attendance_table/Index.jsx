import React from "react";
import "./table.css";

function Index({ display, data }) {
  return (
    <>
      {data === "Vendor" ? (
        <div className="attendance-table">
          <h2>{display}</h2>
          <div className="table-row header-row">
            <div className="table-cell">Date </div>
            <div className="table-cell">Stage - Substage </div>
            <div className="table-cell">Block</div>
            <div className="table-cell">Vendor</div>
            <div className="table-cell">Amount </div>
          </div>
          <div style={{ backgroundColor: "white" }} className="table-row">
            <div className="table-cell">15 apr 2024</div>
            <div className="table-cell">first floor</div>
            <div className="table-cell">1</div>
            <div className="table-cell">no one</div>
            <div className="table-cell">20,000</div>
          </div>
        </div>
      ) : (
        <div className="attendance-table">
          <h2>{display}</h2>
          <div className="table-row header-row">
            <div className="table-cell">Date </div>
            <div className="table-cell">Skilled Worker </div>
            <div className="table-cell">Numbers</div>
          </div>
          <div style={{ backgroundColor: "white" }} className="table-row">
            <div className="table-cell">15 apr 2024</div>
            <div className="table-cell">first floor</div>
            <div className="table-cell">20,000</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
