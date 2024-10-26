import React from "react";
import { useLocation } from "react-router-dom";
import MaterialList from "../../Components/MaterialList/Index";
import ProgressBar from "../../Components/Progress_Bar/Index";
import CustomTable from "Components/Custom_Table/Index";

function Index() {
  const location = useLocation();
  const data = location.state;
  const materials = data.materialsWithSameName.map((item) => ({
    date: item.date,
    quantity: item.quantity,
    type: item.type,
    vendor: item.vendor,
    amount: item.amount,
  }));
  const itemName = data.materialsWithSameName[0].materialName;
  return (
    <>
      <div style={{ display: "flex", gap: "2%", marginTop: "5%" }}>
        <MaterialList itemName={itemName} materials={data.purchaseRecord} />
        <div
          style={{ display: "flex", flexDirection: "column", width: "80vw" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ProgressBar
              materialName={itemName}
              used={40}
              remaining={60}
              shortfall={13}
            />
          </div>
          <h2>Purchase record</h2>
          <div style={{ marginTop: "-50px" }}>
            <CustomTable
              data={materials}
              headings={["Date", "Quantity", "Type", "Vendor", "Amount"]}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
