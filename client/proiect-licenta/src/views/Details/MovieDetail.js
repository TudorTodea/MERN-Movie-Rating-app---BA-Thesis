import React, { useEffect, useState } from 'react';
import {
  API_KEY,
  API_URL,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from '../../config/Config';

import { useParams } from 'react-router-dom';
import '../Details/MovieDetail.css';
import BgImageDetails from './BgImageDetails';
import Recommendations from '../../components/Recommendations/Recommendations';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import Favorite from '../Favorite/Favorite';
import Watchlist from '../Watchlist/Watchlist';
import Reviews from '../Review/Reviews';
import axios from 'axios';
import { Row } from 'antd';
import ActorGrid from '../../components/Grids/ActorGrid';
import RatingComp from '../Ratings/RatingComp';


function MovieDetail(props) {
  const { movieId } = useParams();
  const authCtx = useContext(AuthContext);
  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const [CommentLists, setCommentLists] = useState([]);
  const [releasedate, setReleaseDate] = useState('');
  const [Movie, setMovie] = useState([]);
  const [director, setDirector] = useState('');
  const [writers, setWriters] = useState([]);
  const [cast, setCast] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const movieVariable = {
    movieId: movieId,
  };

  useEffect(() => {
    let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    let endpointForYoutubeVideo = `${API_URL}movie/${movieId}/videos?api_key=${API_KEY}`;
    let endpointForCast = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;

    fetchDetailInfo(endpointForMovieInfo);
    fetchYoutubeLink(endpointForYoutubeVideo);
    fetchCast(endpointForCast);
    instance.post('/api/review/getReviews', movieVariable).then((response) => {
      if (response.data.success) {
        setCommentLists(response.data.reviews);
      } else {
        alert('Failed to get comments Info');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchCast = async (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setCast(result.cast);
        // eslint-disable-next-line
        result.crew.map((crew) => {
          if (crew.department === 'Directing') {
            setDirector(crew.name);
          }
          if (crew.department === 'Writing') {
            setWriters([...writers, crew.name]);
          }
        });
      });
  };
  const fetchDetailInfo = async (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovie(result);
        setReleaseDate(result.release_date);
      });
  };
  const fetchYoutubeLink = async (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setTrailer(result.results.filter((el) => el.type === 'Trailer'));
      });
  };
  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  return (

    <div
      style={{
        width: '1550px',
      }}
      className="wrapper"
    >
      <div className="title1">{Movie.title}</div>

      <div className="title2">
        {Movie.runtime} min
        <span className="span2">{releasedate}</span>
        <span>
          {authCtx.isLoggedIn && (<Favorite
            movieInfo={Movie}
            movieId={movieId}
            userFrom={localStorage.getItem('userid')}
          />
          )}
        </span>
        <span>
          {authCtx.isLoggedIn && (
            <Watchlist
              movieInfo={Movie}
              movieId={movieId}
              userFrom={localStorage.getItem('userid')}
            />
          )}
        </span>
      </div>


      <div className="hero1">
        <div className="imgover">
          {
            <BgImageDetails
              image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
            />
          }
        </div>
      </div>
      <div className="columngenre">
        {Movie.genres && Movie.genres[0] && (
          <span className="tag">
            {Movie.genres[0].name === 'Science Fiction'
              ? 'SF'
              : Movie.genres[0].name}
          </span>
        )}
        {Movie.genres && Movie.genres[1] && (
          <span className="tag">
            {Movie.genres[1].name === 'Science Fiction'
              ? 'SF'
              : Movie.genres[1].name}
          </span>
        )}
        {Movie.genres && Movie.genres[2] && (
          <span className="tag">
            {Movie.genres[2].name === 'Science Fiction'
              ? 'SF'
              : Movie.genres[2].name}
          </span>
        )}
      </div>

      <div className='midcontainer'>
        <img
          src={
            Movie.poster_path
              ? `${IMAGE_BASE_URL}${POSTER_SIZE}${Movie.poster_path}`
              : null
          }
          alt="cover"
          className="cover"
        />
        <div className="description">
          <div>
            <span className="columnTrailer">
              <div >
                {trailer && trailer[0] && (
                  <iframe
                    width="550"
                    height="250"
                    src={`https://www.youtube.com/embed/${trailer[0].key}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen={true}
                    title="Embedded youtube"
                  />
                )}
              </div>
            </span>
          </div>
        </div>


        <RatingComp
          imdbId={Movie.imdb_id}
          rateAvg={Movie.vote_average}
          movieId={movieId}
          userFrom={localStorage.getItem('userid')}
        />

      </div>
      <div className="column2">
        <p className="moviedescription">{Movie.overview}</p>

        <hr />

        {Movie && Movie.budget ? (
          <p className="p2">Budget : ${Movie.budget.toLocaleString()}</p>
        ) : (
          <p className="p2">Budget : Unkown</p>
        )}

        {Movie && Movie.revenue ? (
          <p className="p2">Revenue : ${Movie.revenue.toLocaleString()}</p>
        ) : (
          <p className="p2">Revenue : Unkown</p>
        )}

        <p className="p2">Director : {director}</p>
        <p className="p2">Writer : {writers[0]}</p>

        <hr />
        {cast && cast[0] && (
          <p className="p2">
            Stars : {cast[0].name}, {cast[1].name}, {cast[2].name}
          </p>
        )}
        <div>
          {' '}
          <br />
          <br />
          <br />
          <p style={{ fontSize: '30px' }}>If you liked this movie:</p>
          <br />
          <br />
          <Recommendations movieId={movieId}></Recommendations>
        </div>
      </div>
      <br />
      <br />
      <p style={{ fontSize: '30px' }}> Top Cast</p>
      <br />
      <br />
      <div style={{ width: '1200px' }}>
        {cast && (
          <Row gutter={[16, 16]}>
            {cast.map(
              (cast, index) =>
                index < 15 &&
                cast.profile_path && (
                  <span style={{ marginTop: '50px' }}>
                    <ActorGrid
                      actor
                      image={cast.profile_path}
                      name={cast.name}
                    />
                  </span>
                )
            )}
          </Row>
        )}
        <Reviews
          movieTitle={Movie.original_title}
          CommentLists={CommentLists}
          postId={movieId}
          refreshFunction={updateComment}
        />
      </div>

    </div>



  );
}

export default MovieDetail;
