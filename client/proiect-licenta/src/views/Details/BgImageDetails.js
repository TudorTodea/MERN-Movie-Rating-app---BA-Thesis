import React from "react";
function BgImageDetails(props) {
  return (
    <div
      style={{
        background: `linear-gradient(to top, rgba(0,0,0,0.85),transparent),
            url('${props.image}')`,
        height: "500px",
        backgroundSize: "100%, cover",
        backgroundPosition: "center, center",
        width: "100%",
        position: "relative",
      }}
    />
  );
}

export default BgImageDetails;
