import React from 'react';
import '../components/grid.css';

function FavoritesGrid(props) {
  let { image, movieId, movieName, text } = props;
  console.log(image);
  return (
    <div className="wrapper1">
      <div className="container">
        <div className="lol">
          <a href={`/movie/${movieId}`}>
            <img style={{ width: '200px', height: '100%' }} src={image} />
          </a>
        </div>
        <div className="colum">
          <br />
          <div className="info_section">
            <div className="movie_header">
              <h1>{movieName}</h1>
              <br />
            </div>
            <div className="movie_desc">
              <h4 className="type">{text}</h4>
            </div>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FavoritesGrid;
