import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import axios from 'axios';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config/Config';
import './Favorite.css';
import { useNavigate, useParams } from 'react-router-dom';


const { Title } = Typography;

function FavoritePage() {
  const navigate = useNavigate();

  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const [Favorites, setFavorites] = useState([]);
  const [, setLoading] = useState(true);
  const { id } = useParams();
  let variable = { userFrom: id };
  useEffect(() => {
    fetchFavoredMovie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchFavoredMovie = () => {
    instance
      .post('/api/favorite/getFavoredMovie', variable)
      .then((response) => {
        if (response.data.success) {
          setFavorites(response.data.favorites);
          setLoading(false);
        } else {
          alert('Failed to get favored movie');
        }
      });
  };


  return (
    <div className="wrapper">
      <div style={{ width: '85%', margin: '3rem auto' }}>
        <Title level={2}> My favorite movies </Title>

        {Favorites.map((favorite, index) => {
          return (
            <tr key={index}>
              <p style={{ display: 'flex', paddingTop: '20px' }}>
                {favorite.movieTitle}
              </p>
              <div
                style={{
                  marginTop: '25px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {favorite.moviePoster ? (
                  <img
                    alt="moviePoster"
                    onClick={() => {
                      navigate(`/movie/${favorite.movieId}`);
                    }}
                    style={{ width: '15%' }}
                    src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePoster}`}
                  />
                ) : (
                  'no image available'
                )}

                <p className="ovw">{favorite.movieOverview}</p>
              </div>
            </tr>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritePage;
