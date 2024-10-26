// src/CircularProgressBar.js
import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 600px;
  height: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 15px 32% 15px 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ShortfallText = styled.div`
  margin-top: 20px;
  font-size: 18px;
  color: #f77;
  font-weight: bold;
`;

const RemainingText = styled.div`
  position: absolute;
  bottom: 25px;
  font-size: 18px;
  color: #aea0a0;
  left: -150px;
  font-weight: 600;
`;

const UsedText = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #f77;
  font-weight: bold;
  right: -45%;
`;

const CircularProgressBar = ({ used, remaining, shortfall, materialName }) => {
  const percentage = (used / (used + remaining)) * 100;
  console.log("progreess", materialName);

  return (
    <Container>
      <h2>{materialName}</h2>
      <div style={{ position: "relative", width: "250px", height: "250px" }}>
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: "#ff7329",
            textColor: "#ff7329",
            trailColor: "#eee",
          })}
        />
        <RemainingText>{remaining}Lt Remaining</RemainingText>
        <UsedText>{used}Lt Used</UsedText>
      </div>
      <ShortfallText>Shortfall - {shortfall}Lt</ShortfallText>
    </Container>
  );
};

export default CircularProgressBar;
