
import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SearchGrid from '../../components/Search/SearchGrid';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config/Config';
import './Profile.css';

function Profile() {
  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const [watchlist, setWatchlist] = useState([]);
  const [Favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const { id } = useParams();
  let variable = { userFrom: id };

  useEffect(() => {
    fetchWatchlist();
    fetchFavoredMovie();
    fetchUsername();
    fetchReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchReviews = () => {
    instance.post('/api/review/getReviewsOfUser', variable).then((response) => {
      if (response.data.success) {
      } else {
        alert('Failed to get reviews');
      }
    });
  };
  const fetchUsername = () => {
    instance.post('/api/auth/getUsername', variable).then((response) => {
      if (response.data.success) {

        setUser(response.data.result);
      } else {
        alert('Failed to get username');
      }
    });
  };
  const fetchFavoredMovie = () => {
    instance
      .post('/api/favorite/getFavoredMovie', variable)
      .then((response) => {
        if (response.data.success) {
          setFavorites(response.data.favorites);
        } else {
          alert('Failed to get favored movie');
        }
      });
  };
  const fetchWatchlist = () => {
    instance
      .post('/api/watchlist/getWatchlistedMovie', variable)
      .then((response) => {
        if (response.data.success) {
          setWatchlist(response.data.watchlisted);
        } else {
          alert('Failed to get Watchlist');
        }
      });
  };
  return (
    <div className="wrapper">
      <div className="profileheader">
        {id === localStorage.getItem('userid') ? (
          <a href={`/edit/watchlist/${id}`}>Manage Watchlist</a>
        ) : null}{' '}
        {id === localStorage.getItem('userid') ? (
          <a className="favheader" href={`/edit/favorite/${id}`}>
            Manage Favorites
          </a>
        ) : null}
      </div>
      {user &&
        <div className="topbarprofile">
          <img
            className="photouser"
            src={user.avatar}
            alt=""
          />
        </div>
      }
      {user &&
        <div className="profile">
          <p className="username">{user.username}</p>
        </div>}
      <br />
      <br />
      <br />
      {user &&
        <p className="userWatchlist">{user.username}'s Watchlist</p>}
      <br />
      <div className="watchlist">
        {watchlist &&
          watchlist.map((movie, index) => (
            <React.Fragment key={index}>
              {index < 5 ? (
                <SearchGrid
                  image={
                    movie.moviePoster
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.moviePoster}`
                      : null
                  }
                  movieId={movie.movieId}
                ></SearchGrid>
              ) : null}
            </React.Fragment>
          ))}
      </div>
      <a className="seemore" href={`/Watchlist/${id}`}>
        See more
      </a>
      <br />
      <br />
      <br />
      {user &&
        <p className="userWatchlist">{user.username}'s Favorite movies</p>}
      <br />
      <div className="watchlist">
        {Favorites &&
          Favorites.map((movie, index) => (
            <React.Fragment key={index}>
              {index < 5 ? (
                <SearchGrid
                  image={
                    movie.moviePoster
                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.moviePoster}`
                      : null
                  }
                  movieId={movie.movieId}
                ></SearchGrid>
              ) : null}
            </React.Fragment>
          ))}
      </div>
      <a className="seemore" href={`/Favorite/${id}`}>
        See more
      </a>
    </div>
  );
}

export default Profile;
