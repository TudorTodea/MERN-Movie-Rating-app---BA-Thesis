import React from "react";
function MainImage(props) {
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
    >
      <div>
        <div
          style={{
            position: "absolute",
            maxWidth: "500px",
            bottom: "2rem",
            marginLeft: "2rem",
          }}
        >
          <p style={{ color: "white" }} level={2}>
            {" "}
            {props.title}{" "}
          </p>
          <p style={{ color: "white", fontSize: "1rem" }}>{props.text} </p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
