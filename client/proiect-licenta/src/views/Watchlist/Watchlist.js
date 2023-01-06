import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import '../Details/MovieDetail.css';
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import './Watchlist.css'
function Watchlist(props) {
  const authCtx = useContext(AuthContext);
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const movieTitle = props.movieInfo.title;
  const moviePoster = props.movieInfo.poster_path;
  const moviePost = props.movieInfo.backdrop_path;
  const movieOverview = props.movieInfo.overview;
  const movieRunTime = props.movieInfo.runtime;
  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const [WatchlistNumber, setWatchlistNumber] = useState(0);
  const [Watchlisted, setWatchlisted] = useState(false);
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

  const onClickWatchlist = () => {
    if (!isLoggedIn) {
      return alert('Please Log in first');
    }

    if (Watchlisted) {
      instance
        .post('/api/watchlist/removeFromWatchlist', variables)
        .then((response) => {
          if (response.data.success) {
            setWatchlistNumber(WatchlistNumber - 1);
            setWatchlisted(!Watchlisted);
          } else {
            alert('Failed to Remove From Favorite');
          }
        });
    } else {
      instance
        .post('/api/watchlist/addToWatchlist', variables)
        .then((response) => {
          if (response.data.success) {
            setWatchlistNumber(WatchlistNumber + 1);
            setWatchlisted(!Watchlisted);
          } else {
            alert('Failed to Add To Favorite');
          }
        });
    }
  };

  useEffect(() => {
    instance
      .post('/api/watchlist/WatchlistNumber', variables)
      .then((response) => {
        if (response.data.success) {
          setWatchlistNumber(response.data.subscribeNumber);
        } else {
          alert('Failed to get Favorite Number');
        }
      });

    instance.post('/api/watchlist/Watchlisted', variables).then((response) => {
      if (response.data.success) {
        setWatchlisted(response.data.subcribed);
      } else {
        alert('Failed to get Favorite Information');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        Watchlisted ? <AiFillEyeInvisible className='watchlistbtn' color='white' size={40} onClick={onClickWatchlist} /> :
          <AiFillEye color='white' className='watchlistbtn' size={40} onClick={onClickWatchlist} />
      }
    </>
  );
}

export default Watchlist;
