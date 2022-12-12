import React from 'react';
import { IMAGE_BASE_URL } from '../../config/Config';
import './ActorGrid.css';
function ActorGrid(props) {
  let { image, characterName } = props;

  const POSTER_SIZE = 'w154';

  return (
    <React.Fragment>
      <span style={{ paddingLeft: '40px' }} className="actorelems">
        <img
          style={{ width: '10%', height: '10%', borderRadius: '50%' }}
          alt={characterName}
          src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`}
        />
      </span>
    </React.Fragment>
  );
}

export default ActorGrid;
