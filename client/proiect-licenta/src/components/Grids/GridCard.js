import React from 'react';
import './grid.css';

function GridCard(props) {
  let { image, movieId, movieName, text, rdate, genresarr } = props;
  const handleGender = (id) => {
    if (id === 28) return 'Action';
    if (id === 12) return 'Adventure';
    if (id === 37) return 'Western';
    if (id === 80) return 'Crime';
    if (id === 878) return 'SF';
    if (id === 18) return 'Drama';
    if (id === 16) return 'Animation';
    if (id === 35) return 'Comedy';
    if (id === 27) return 'Horror';
    if (id === 14) return 'Fantasy';
    if (id === 99) return 'Documentary';
    if (id === 10751) return 'Familly';
    if (id === 36) return 'History';
    if (id === 10402) return 'Music';
    if (id === 9648) return 'Mystery';
    if (id === 10749) return 'Romance';
    if (id === 10770) return 'TV Movie';
    if (id === 53) return 'Thriller';
    if (id === 9648) return 'Mystery';
    if (id === 10752) return 'War';
    if (id === 37) return 'Western';
  };

  return (
    <div className="wrapper1">
      <div className="container">
        <div className="lol">
          <a href={`/movie/${movieId}`}>
            <img alt="gridImg" style={{ width: '200px', height: '100%' }} src={image} />
          </a>
        </div>
        <div className="colum">
          <br />
          <div className="info_section">
            <div className="movie_header">
              <h1>{movieName}</h1>
              <br />
              <h4>{rdate.slice(0, 4)}</h4>

              <h4 className="type">
                {handleGender(genresarr[0])} {handleGender(genresarr[1])}{' '}
                {handleGender(genresarr[2])}
              </h4>
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

export default GridCard;
