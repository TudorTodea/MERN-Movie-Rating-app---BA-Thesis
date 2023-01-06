import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import './Rating.css';
import { Rating } from '@mui/material';
import { SiImdb } from "react-icons/si";
import { AiFillStar } from "react-icons/ai";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

function RatingComp(props) {
  const authCtx = useContext(AuthContext);
  const movieId = props.movieId;
  const userFrom = props.userFrom;
  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const [finalRating, setFinalRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [Rated, setRated] = useState(false);
  const [rvalue, setRvalue] = useState(0);
  const [nrRating, setNrRatings] = useState(0);
  const variables = {
    movieId: movieId,
    user: userFrom,
  };
  const isLoggedIn = authCtx.isLoggedIn;

  const onClickRating = (val) => {
    const valr = val.target._wrapperState.initialValue;
    const variables2 = {
      movieId: movieId,
      user: userFrom,
      rating: valr,
    };
    if (!isLoggedIn) {
      return alert('Please Log in first');
    }

    if (Rated) {
      instance
        .delete(
          `/api/rating/removeFromRatings?user=${variables.user}&movieId=${variables.movieId}`
        )
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
        setRating(response.data.ratingResult.rating);
      } else {
        alert('Failed ');
      }
    }
    );
  };

  useEffect(() => {
    instance.post('/api/rating/getnrratings', variables).then((response) => {
      if (response.data.success) {
        setNrRatings(response.data.count)
      } else {
        alert('Failed ');
      }
    })

    instance
      .get(
        `/api/rating/Rated?user=${variables.user}&movieId=${variables.movieId}`
      )
      .then((response) => {
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
    instance
      .post('/api/rating/getratingsfromId', variables)
      .then((response) => {
        if (response.data.success) {
          setRvalue(response.data.ratings[0].rating);
        } else {
          alert('Failed to get Information');
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  useEffect(() => {
    instance
      .post('/api/rating/getratingsfromId', variables)
      .then((response) => {
        if (response.data.success) {
          setRvalue(response.data.ratings[0].rating);
        } else {
          alert('Failed to get Information');
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    setFinalRating(finalRating + rating);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating]);

  return (
    <div>
      <div className="starrating">
        <p style={{ fontWeight: 'bold', marginLeft: '41%' }}>SCORE</p>
        <div className="rating">
          {finalRating === 'NaN' ? 'N/A' : finalRating}
        </div>
        <span style={{ marginLeft: '75px' }}>
          <Rating
            defaultValue={3}
            value={rvalue}
            size="large"
            sx={{
              '& .MuiRating-iconFilled': {
                color: 'red',
              },
              '& .MuiRating-icon': {
                color: 'red',
              }
            }}
            emptyIcon={
              <StarBorderOutlinedIcon fontSize="inherit" />
            }
            onChange={(newValue) => {
              onClickRating(newValue);
            }}
          />
        </span>
        <div style={{ width: '200px', paddingLeft: '120px', paddingTop: '5%' }}>
          {nrRating} users
        </div>
        <div style={{ width: '200px', paddingLeft: '125px', paddingTop: '20%' }}>
          <a href={`//www.imdb.com/title/${props.imdbId}/`}>
            <SiImdb color='yellow' size={40} />
          </a>
        </div>
        <div style={{ paddingLeft: '80px' }}>
          <AiFillStar style={{ paddingTop: '10px' }} color='yellow' size={30} />
          {props.rateAvg &&
            <span style={{ fontSize: '30px' }}>{props.rateAvg.toFixed(1)}/10</span>}
        </div>
        <br />

      </div>
    </div>
  );
}

export default RatingComp;
