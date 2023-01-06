import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DislikeOutlined, LikeOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import './LikeDislike.css'
function LikeDislikes(props) {
  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);
  let variable = {};

  variable = { reviewId: props.reviewId, userId: props.currentUserId };

  useEffect(() => {
    instance.post('/api/likedislike/getLikes', variable).then((response) => {
      if (response.data.success) {
        setLikes(response.data.likes.length);
        // eslint-disable-next-line
        response.data.likes.map((like) => {
          if (like.userId === props.currentUserId) {
            setLikeAction('liked');
          }
        });
      } else {
        alert('Failed to get likes');
      }
    });

    instance.post('/api/likedislike/getDislikes', variable).then((response) => {
      if (response.data.success) {
        setDislikes(response.data.dislikes.length);
        // eslint-disable-next-line
        response.data.dislikes.map((dislike) => {
          if (dislike.userId === props.currentUserId) {
            setDislikeAction('disliked');
          }
        });
      } else {
        alert('Failed to get dislikes');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLike = () => {
    if (!isLoggedIn) {
      return alert('Please Log in first');
    }

    if (LikeAction === null) {
      instance.post('/api/likedislike/upLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction('liked');

          if (DislikeAction !== null) {
            setDislikeAction(null);
            setDislikes(Dislikes - 1);
          }
        } else {
          alert('Failed to increase the like');
        }
      });
    } else {
      instance.post('/api/likedislike/unLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert('Failed to decrease the like');
        }
      });
    }
  };

  const onDislike = () => {
    if (!isLoggedIn) {
      return alert('Please Log in first');
    }

    if (DislikeAction !== null) {
      instance.post('/api/likedislike/unDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert('Failed to decrease dislike');
        }
      });
    } else {
      instance.post('/api/likedislike/upDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction('disliked');

          if (LikeAction !== null) {
            setLikeAction(null);
            setLikes(Likes - 1);
          }
        } else {
          alert('Failed to increase dislike');
        }
      });
    }
  };

  return (
    <div className='like-dislike-container'>
      <span key="comment-basic-like">
        <LikeOutlined name="like" onClick={onLike} />

        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <DislikeOutlined name="dislike" onClick={onDislike} />

        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislikes;
