import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  POSTER_SIZE,
} from '../../config/Config';
import React, { useEffect, useState, useRef } from 'react';
import { Typography, Row } from 'antd';
import GridCard from '../../components/Grids/GridCard';
const { Title } = Typography;

function UpcomingMovies() {
  const [Movies, setMovies] = useState([]);
  const [CurrentPage, setCurrentPage] = useState(1);
  const buttonRef = useRef(null);
  const currentDate = useRef(null);
  const futureDate = useRef(null);

  const getReversedDate = (str) => {
    const reversedCurrentDate = str.split(`-`).reverse().join('-');
    return reversedCurrentDate;
  }

  useEffect(() => {
    const current = new Date();
    let currentMonth;
    let futureMonth;
    const currentDay = current.getDate() < 10 ? "0" + current.getDate() : current.getDate()
    if (current.getMonth() < 1) {
      currentMonth = current.getMonth() + 1
      futureMonth = current.getMonth() + 2
      currentMonth = "0" + currentMonth
      futureMonth = "0" + futureMonth
    } else {
      currentMonth = current.getMonth() < 10 ? "0" + current.getMonth() + 1 : current.getMonth() + 1
    }

    currentDate.current = getReversedDate(`${currentDay}-${currentMonth}-${current.getFullYear()}`);
    if ((current.getMonth() + 2) > 12) {
      futureDate.current = getReversedDate(`${currentDay}-01-${current.getFullYear() + 1}`);
    } else {
      futureDate.current = getReversedDate(`${currentDay}-${futureMonth}-${current.getFullYear()}`);
    }
    console.log(currentDate.current)
    console.log(futureDate.current)
    const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&page=1&primary_release_date.gte=${currentDate.current}&primary_release_date.lte=${futureDate.current}`;
    fetchMovies(endpoint);

    window.addEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMovies = async (endpoint) => {
    const response = await fetch(endpoint);
    const data = await response.json();

    setMovies([...Movies, ...data.results]);
    setCurrentPage(data.page);
  };
  const loadMoreItems = () => {
    let endpoint = '';

    endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1
      }&primary_release_date.gte=${currentDate.current}&primary_release_date.lte=${futureDate.current}`;

    fetchMovies(endpoint);
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
          Upcoming movies{' '}
        </Title>

        <br />

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
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>
          Load More
        </button>
      </div>
    </div>
  );
}

export default UpcomingMovies;
