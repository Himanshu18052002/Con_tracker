import React from "react";
import module from "./cards.module.css";
import { useNavigate } from "react-router-dom";

function Index({ data }) {
  const navigate = useNavigate();
  const handleDrawingDetail = () => {
    navigate("/drawing_details", {
      state: {
        data: data,
      },
    });
  };
  return (
    <div className={module.container}>
      <div onClick={handleDrawingDetail} className={module.imageContainer}>
        <img src={data.drawing} alt={data.name} className={module.image} />
      </div>
      <div className={module.textContainer}>
        <h3
          style={{
            color: "#ff7329",
            lineHeight: 0,
            fontSize: "2rem",
            fontWeight: "600",
          }}
        >
          {data.name}
        </h3>
        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: 0,
            fontWeight: "600",
            color: "#707070",
            marginTop: "5px",
          }}
        >
          {data.details}
        </p>
      </div>
    </div>
  );
}

export default Index;
