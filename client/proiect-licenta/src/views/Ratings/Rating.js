import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StarOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import ReactStars from 'react-rating-stars-component';
import './Rating.css';
function Rating(props) {
  const authCtx = useContext(AuthContext);
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const [finalRating, setFinalRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [Rated, setRated] = useState(false);
  const variables = {
    movieId: movieId,
    user: userFrom,
  };
  const isLoggedIn = authCtx.isLoggedIn;

  const onClickRating = (val) => {
    const variables2 = {
      movieId: movieId,
      user: userFrom,
      rating: val,
    };
    if (!isLoggedIn) {
      return alert('Please Log in first');
    }

    if (Rated) {
      console.log(Rated);
      instance
        .post('/api/rating/removeFromRatings', variables)
        .then((response) => {
          if (response.data.success) {
            setRated(true);
          } else {
            alert('Failed');
          }
        });
    }

    instance.post('/api/rating/upvote', variables2).then((response) => {
      if (response.data.success) {
        setRated(true);
        console.log(response.data.ratingResult);
        setRating(response.data.ratingResult.rating);
      } else {
        alert('Failed ');
      }
    });
  };

  useEffect(() => {
    instance.post('/api/rating/Rated', variables).then((response) => {
      if (response.data.success) {
        setRated(response.data.subcribed);
      } else {
        alert('Failed to get Information');
      }
    });
    instance.post('/api/rating/getfinalrating', variables).then((response) => {
      if (response.data.success) {
        setFinalRating(response.data.finalval);
      } else {
        alert('Failed to get Information');
      }
    });
  }, [rating]);

  useEffect(() => {
    setFinalRating(finalRating + rating);
  }, [rating]);
  const ratingVal = {
    size: 20,
    count: 5,

    isHalf: false,

    color: 'grey',
    activeColor: 'yellow',

    onChange: (newValue) => {
      onClickRating(newValue);
    },
  };
  return (
    <div>
      <p className="ratetext">Rate this movie:</p>
      <br />
      <div className="starrating">
        <ReactStars {...ratingVal} />
        <br />
        <span className="rating">
          <StarOutlined />
          {finalRating === NaN ? 0 : finalRating}/5
        </span>
      </div>
    </div>
  );
}

export default Rating;
