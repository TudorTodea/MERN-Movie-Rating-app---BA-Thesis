import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import SingleReview from './SingleReview';
import './Review.css'
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { IoMdSend } from "react-icons/io"
function Reviews(props) {
  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const authCtx = useContext(AuthContext);
  const [Comment, setComment] = useState('');
  const isLoggedIn = authCtx.isLoggedIn;
  console.log(props)
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
      <h3> Write a review for {props.movieTitle} </h3>
      <hr />
      <div >
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
      </div>
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

      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          className='text-areaStyling'
          style={{ width: '100%', borderRadius: '5px' }}
          onChange={handleChange}
          value={Comment}
          placeholder="Write your review"
        />
        <br />
        <Button className='button-83' onClick={onSubmit}>
          <IoMdSend size={40} />
        </Button>
      </form>
    </div>
  );
}

export default Reviews;
