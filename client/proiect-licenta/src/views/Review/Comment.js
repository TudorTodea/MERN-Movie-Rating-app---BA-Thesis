import LikeDislikes from '../LikeDislike/LikeDislikes'
import { useNavigate } from 'react-router-dom';
import './Comment.css'
const Comment = ({ review, reviewId, userId, author, content, avatar, currentUserId }) => {
  const navigate = useNavigate();
  const imageClick = () => {
    navigate(`/profile/${userId}`);
  };
  return (
    <div >
      <div className='comment-container'>
        <div className='text-comment'>
          <div className='comment-card'>
            <p className='text-paragraph'>{content}</p>

          </div>
          <div>
            <LikeDislikes
              review={review}
              reviewId={reviewId}
              currentUserId={currentUserId}
            />
          </div>
        </div>
        <div className='img-comment'>
          <img
            onClick={() => imageClick()}
            className="photouser"
            src={avatar}
            alt="Anonim"
          />
          <div className='comment-username'>
            <a style={{ color: 'white' }} href={`/profile/${userId}`}>{author}</a>
          </div>


        </div>
      </div>

    </div>

  )
}

export default Comment