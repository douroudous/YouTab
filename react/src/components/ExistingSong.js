import React from 'react';

const ExistingSong  = props => {

  return(
    <div className='text centered'>
      <button className="button new-button" onClick={() => props.handleSubmit(props.song)}>
        {props.song}
      </button>
    </div>
  );
};

export default ExistingSong;
