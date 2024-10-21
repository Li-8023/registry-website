import React from "react";

const LoadingPopup: React.FC = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        padding: "20px",
        backgroundColor: "white",
        borderRadius: "10px",
        textAlign: "center",
      }}
    >
      <p>加载中...</p>
    </div>
  </div>
);

export default LoadingPopup;
