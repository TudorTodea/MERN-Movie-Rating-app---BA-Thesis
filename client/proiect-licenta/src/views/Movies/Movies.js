import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  POSTER_SIZE,
} from '../../config/Config';
import React, { useEffect, useState, useRef } from 'react';
import { Typography, Row } from 'antd';
import './Movies.css';
import GridCard from '../../components/Grids/GridCard';
const { Title } = Typography;

function Movies() {
  const [Movies, setMovies] = useState([]);
  const [movieGenre, setMovieGenre] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [genreId, setGenreId] = useState(null);
  const buttonRef = useRef(null);
  const movieGenres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'SF' },
    { id: 10770, name: 'TV' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ];
  useEffect(() => {
    if (!genreId) {
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
      fetchMovies(endpoint);
    }
    window.addEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&page=1&with_genres=${genreId}`;
    fetchMovies(endpoint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genreId]);

  const fetchMovies = async (endpoint) => {
    const response = await fetch(endpoint);
    const data = await response.json();
    if (genreId) {
      setMovieGenre([...movieGenre, ...data.results]);
      setCurrentPage(data.page);
    } else {
      setMovies([...Movies, ...data.results]);
      setCurrentPage(data.page);
    }
  };
  const loadMoreItems = () => {
    let endpoint = '';
    if (!genreId) {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1
        }`;
    } else {
      endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&&with_genres=${genreId}&page=${CurrentPage + 1
        }`;
    }
    fetchMovies(endpoint);
  };

  const genreClick = (val) => {
    setMovieGenre([]);
    setGenreId(val.id);
  };

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.offsetHeight;
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight - 1) {
      buttonRef.current.click();
    }
  };
  return (
    <div>
      <div className="wrapper" style={{ width: '100%', margin: '0' }}></div>

      <div style={{ width: '85%', margin: '1rem auto' }}>
        <Title className="wrapper" level={10}>
          {' '}
          Latest movies{' '}
        </Title>

        <br />
        <div className="filter">
          {movieGenres.map((genre, id) => {
            return (
              <span
                onClick={() => {
                  genreClick(genre);
                }}
                key={genre.name}
                className="tag2"
              >
                {genre.name}
              </span>
            );
          })}
        </div>
        {!genreId ? (
          <Row gutter={[32, 32]}>
            {Movies &&
              Movies.map((movie, index) => (
                <React.Fragment key={index}>
                  <GridCard
                    image={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                        : null
                    }
                    movieId={movie.id}
                    movieName={movie.original_title}
                    text={movie.overview}
                    rdate={movie.release_date}
                    genresarr={movie.genre_ids}
                  />
                </React.Fragment>
              ))}
          </Row>
        ) : (
          <Row gutter={[32, 32]}>
            {movieGenre &&
              movieGenre.map((movie, index) => (
                <React.Fragment key={index}>
                  <GridCard
                    image={
                      movie.poster_path
                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                        : null
                    }
                    movieId={movie.id}
                    movieName={movie.original_title}
                    text={movie.overview}
                    rdate={movie.release_date}
                    genresarr={movie.genre_ids}
                  />
                </React.Fragment>
              ))}
          </Row>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>
          Load More
        </button>
      </div>
    </div>
  );
}

export default Movies;
