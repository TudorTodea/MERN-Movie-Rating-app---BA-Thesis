import React from "react";

function RecommendationsGrid(props) {
  let { image, movieId, movieName } = props;


  return (
    <React.Fragment>
      <span className="backspan">
        <a href={`/movie/${movieId}`}>
          <img
            style={{ width: "20%", height: "40%" }}
            alt={movieName}
            src={image}
            className="backspan"
          />
        </a>
      </span>
    </React.Fragment>
  );
}

export default RecommendationsGrid;
