import React from "react";
import { GridLoader } from "react-spinners";

const Loading = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GridLoader loading={true} size={20} margin={2} color={"#4A90E2"} />
    </div>
  );
};

export default Loading;
