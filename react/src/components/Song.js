import React from 'react';

const Song  = props => {

  return(
    <div className='text centered'>
      <button className="button" onClick={() => props.handleSubmit(props.song)}>
        {props.song}
      </button>
    </div>
  );
};

export default Song;
