import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import axios from 'axios';
import './Review.css';
import Comment from './Comment';
const { TextArea } = Input;

function SingleReview(props) {
  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const [CommentValue, setCommentValue] = useState('');
  const [user, setUser] = useState(null);
  const [CommentActive, setCommentActive] = useState(false);
  let variable = { username: props.comment.writer.username };

  useEffect(() => {
    instance.post('/api/auth/getIdFromUsername', variable).then((response) => {
      if (response.data.success) {
        setUser(response.data.result);
      } else {
        alert('Failed to get username');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      writer: localStorage.getItem('userid'),
      postId: props.postId,
      content: CommentValue,
    };

    instance.post('/api/review/saveReview', variables).then((response) => {
      if (response.data.success) {
        setCommentValue('');
        setCommentActive(!CommentActive);
        props.refreshFunction(response.data.result);
      } else {
        alert('Failed to save Comment');
      }
    });
  };


  return (
    <>
      {user &&
        <Comment
          review
          reviewId={props.comment._id}
          userId={user._id}
          currentUserId={localStorage.getItem('userid')}
          avatar={user.avatar}
          author={props.comment.writer.username}
          content={props.comment.content}

        />
      }
      {CommentActive && (
        <form onSubmit={onSubmit}>
          <TextArea
            style={{ marginTop: '100px', width: '100%', borderRadius: '5px' }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="write some comments"
          />
        </form>
      )}
    </>
  );
}

export default SingleReview;
