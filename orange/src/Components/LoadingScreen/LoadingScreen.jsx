import React from "react";
import { CircularProgress } from "@mui/material";

const LoadingScreen = () => {
  const styles = {
    container: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      background:
        "linear-gradient(90deg, rgba(250,250,250,1) 0%, rgba(148,187,233,1) 100%)",
      zIndex: 1000,
    },
  };

  return (
    <div style={styles.container}>
      <CircularProgress size={120} sx={{ color: "#988cfb" }} thickness={3} />
      <h3 style={{ fontWeight: 300, fontSize: "35px" }}>Loading...</h3>
    </div>
  );
};

export default LoadingScreen;
