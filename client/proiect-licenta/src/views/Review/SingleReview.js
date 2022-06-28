import React, { useEffect, useState } from 'react';
import { Comment, Button, Input } from 'antd';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import LikeDislikes from '../LikeDislike/LikeDislikes';
import './Review.css';
import { useNavigate } from 'react-router-dom';
const { TextArea } = Input;

function SingleReview(props) {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const instance = axios.create({ baseURL: 'http://localhost:5000' });
  const [CommentValue, setCommentValue] = useState('');
  const [id, setId] = useState('');
  const [OpenReply, setOpenReply] = useState(false);
  let variable = { username: props.comment.writer.username };
  console.log(variable);
  const isLoggedIn = authCtx.isLoggedIn;

  useEffect(() => {
    instance.post('/api/auth/getIdFromUsername', variable).then((response) => {
      console.log(variable);
      if (response.data.success) {
        console.log(response.data);
        setId(response.data.result._id);
      } else {
        alert('Failed to get username');
      }
    });
  }, []);

  console.log(props.comment.writer.name);
  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  };
  const imageClick = () => {
    navigate(`/profile/${id}`);
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
        setOpenReply(!OpenReply);
        props.refreshFunction(response.data.result);
      } else {
        alert('Failed to save Comment');
      }
    });
  };
  const actions = [
    <LikeDislikes
      review
      reviewId={props.comment._id}
      userId={localStorage.getItem('userid')}
    />,
  ];

  return (
    <div>
      <Comment
        actions={actions}
        author={<a href={`/profile/${id}`}>{props.comment.writer.username}</a>}
        avatar={
          <img
            onClick={() => imageClick()}
            className="photouser"
            src="https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png"
            alt="Han Solo"
          />
        }
        content={<p className="com">{props.comment.content}</p>}
      >
        {}
      </Comment>

      {OpenReply && (
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <TextArea
            style={{ width: '100%', borderRadius: '5px' }}
            onChange={handleChange}
            value={CommentValue}
            placeholder="write some comments"
          />
          <br />
          <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default SingleReview;
