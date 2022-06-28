import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import axios from 'axios';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config/Config';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import './Favorite.css';
import { useNavigate, useParams } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';

const { Title } = Typography;

function FavoritePage() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const [Favorites, setFavorites] = useState([]);
  const [Loading, setLoading] = useState(true);
  const { id } = useParams();
  let variable = { userFrom: id };

  const isLoggedIn = authCtx.isLoggedIn;
  useEffect(() => {
    fetchFavoredMovie();
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

  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId: movieId,
      userFrom: userFrom,
    };

    instance
      .post('/api/favorite/removeFromFavorite', variables)
      .then((response) => {
        if (response.data.success) {
          fetchFavoredMovie();
        } else {
          alert('Failed to Remove From Favorites');
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

                <span>
                  {id === localStorage.getItem('userid') ? (
                    <CloseOutlined
                      className="removebtn"
                      style={{ alignItems: 'center' }}
                      onClick={() =>
                        onClickDelete(favorite.movieId, favorite.userFrom)
                      }
                    />
                  ) : null}
                </span>
              </div>
            </tr>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritePage;
