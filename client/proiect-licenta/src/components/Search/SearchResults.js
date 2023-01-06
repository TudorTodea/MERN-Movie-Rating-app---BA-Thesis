import React, { useEffect, useState } from 'react';
import { Row } from 'antd';
import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  POSTER_SIZE,
} from '../../config/Config';
import SearchGrid from './SearchGrid';

function SearchResults(props) {
  let { param } = props;
  const [info, setInfo] = useState([]);

  useEffect(() => {
    if (param) {
      let endpointForSearchInfo = `${API_URL}search/movie?api_key=${API_KEY}&query=${param}`;

      fetchSearchInfo(endpointForSearchInfo);
    }
  }, [param]);
  const fetchSearchInfo = async (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setInfo([result.results.filter((info) => info.backdrop_path != null)]);
      });
  };

  return (
    <div className="wrapper">
      {info && info[0] && info[0][0] && info[0][0].title !== 'UNdefined' && (
        <Row gutter={[32, 32]}>
          {info[0].map((movie, index) => (
            <React.Fragment key={index}>
              <SearchGrid
                image={
                  movie.poster_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                    : null
                }
                movieId={movie.id}
                movieName={movie.original_title}
                text={movie.overview}
              ></SearchGrid>
            </React.Fragment>
          ))}
        </Row>
      )}
    </div>
  );
}

export default SearchResults;
