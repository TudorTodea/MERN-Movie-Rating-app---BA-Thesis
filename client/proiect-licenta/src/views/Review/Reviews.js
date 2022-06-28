import React, { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import axios from 'axios';
import SingleReview from './SingleReview';

import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
const { TextArea } = Input;
const { Title } = Typography;
function Reviews(props) {
  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const authCtx = useContext(AuthContext);
  const [Comment, setComment] = useState('');
  const isLoggedIn = authCtx.isLoggedIn;

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      return alert('Please Log in first');
    }
    const userid = localStorage.getItem('userid');

    const variables = {
      content: Comment,
      writer: userid,
      postId: props.postId,
    };
    console.log(variables);

    instance.post('/api/review/saveReview', variables).then((response) => {
      if (response.data.success) {
        setComment('');
        props.refreshFunction(response.data.result);
      } else {
        alert('Failed to save Comment');
      }
    });
  };

  return (
    <div>
      <br />
      <Title level={3}> Write a review for {props.movieTitle} </Title>
      <hr />

      {props.CommentLists &&
        props.CommentLists.map((comment, index) => (
          <React.Fragment>
            <SingleReview
              comment={comment}
              postId={props.postId}
              refreshFunction={props.refreshFunction}
            />
          </React.Fragment>
        ))}

      {props.CommentLists && props.CommentLists.length === 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '200px',
          }}
        >
          Be the first one to write a review
        </div>
      )}

      {/* Root Comment Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <TextArea
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={Comment}
          placeholder="write some comments"
        />
        <br />
        <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default Reviews;
