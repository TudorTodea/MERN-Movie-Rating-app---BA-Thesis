import React from 'react';
import './SearchGrid.css';

function SearchGrid(props) {
  let { image, movieId, movieName } = props;

  return (
    <React.Fragment>
      <span style={{ paddingLeft: '40px' }} className="gridelems">
        <a href={`/movie/${movieId}`}>
          <img
            style={{ width: '15%', height: '15%' }}
            alt={movieName}
            src={image}
          />
        </a>
      </span>
    </React.Fragment>
  );
}

export default SearchGrid;
