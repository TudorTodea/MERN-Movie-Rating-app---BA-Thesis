import React, { useEffect, useState } from "react";

import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  POSTER_SIZE,
} from "../../config/Config";
import RecommendationsGrid from "./RecommendationsGrid";
function Recommendations(props) {
  const { movieId } = props;
  const [Movie, setMovie] = useState([]);

  useEffect(() => {
    let endpointForMovieInfo = `${API_URL}movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US`;
    fetchDetailInfo(endpointForMovieInfo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchDetailInfo = async (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovie(result.results.slice(0, 6));
      });
  };

  return (
    <div>
      {" "}
      {Movie.map((movie, index) => (
        <React.Fragment key={index}>
          <RecommendationsGrid
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : null
            }
            movieId={movie.id}
            movieName={movie.original_title}
            text={movie.overview}
          ></RecommendationsGrid>
        </React.Fragment>
      ))}
    </div>
  );
}

export default Recommendations;
