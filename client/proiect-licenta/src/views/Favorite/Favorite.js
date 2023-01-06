import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import './Favorite.css'
function Favorite(props) {
  const authCtx = useContext(AuthContext);
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePost = props.movieInfo.backdrop_path;
  const moviePoster = props.movieInfo.poster_path;
  const movieRunTime = props.movieInfo.runtime;
  const movieOverview = props.movieInfo.overview;
  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const [FavoriteNumber, setFavoriteNumber] = useState(0);
  const [Favorited, setFavorited] = useState(false);
  const variables = {
    movieId: movieId,
    userFrom: userFrom,
    movieTitle: movieTitle,
    moviePost: moviePost,
    movieOverview: movieOverview,
    moviePoster: moviePoster,
    movieRunTime: movieRunTime,
  };
  const isLoggedIn = authCtx.isLoggedIn;

  const onClickFavorite = () => {
    if (!isLoggedIn) {
      return alert('Please Log in first');
    }

    if (Favorited) {
      instance
        .post('/api/favorite/removeFromFavorite', variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber - 1);
            setFavorited(!Favorited);
          } else {
            alert('Failed to Remove From Favorite');
          }
        });
    } else {
      instance
        .post('/api/favorite/addToFavorite', variables)
        .then((response) => {
          if (response.data.success) {
            setFavoriteNumber(FavoriteNumber + 1);
            setFavorited(!Favorited);
          } else {
            alert('Failed to Add To Favorite');
          }
        });
    }
  };

  useEffect(() => {
    instance
      .post('/api/favorite/favoriteNumber', variables)
      .then((response) => {
        if (response.data.success) {
          setFavoriteNumber(response.data.subscribeNumber);
        } else {
          alert('Failed to get Favorite Number');
        }
      });

    instance.post('/api/favorite/favorited', variables).then((response) => {
      if (response.data.success) {
        setFavorited(response.data.subcribed);
      } else {
        alert('Failed to get Favorite Information');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Favorited ?
        <AiFillHeart className='favoritebtn' size={40} onClick={onClickFavorite} color='red' /> :
        <AiOutlineHeart className='favoritebtn' onClick={onClickFavorite} size={40} color='red' />

      }

    </>
  );
}

export default Favorite;
