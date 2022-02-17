import React from "react";
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Oval heigth="100" width="100" color="grey" ariaLabel="loading" />
    </div>
  );
};

export default Loader;
