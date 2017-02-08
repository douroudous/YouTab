import React from 'react';

const Song  = props => {


  return(
    <div className='text centered'>
      <button className="button" onClick={() => props.handleSubmitExisting(props.title)}>
        {props.title}
      </button>
    </div>
  );
};

export default Song;
