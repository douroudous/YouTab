import React from 'react';

const ImportSong  = props => {

  return(
    <div className='text centered'>
      <button className="button import-button" onClick={() => props.handleSelectImport(props.song)}>
        {props.song.title} ({props.song.version}) - {props.song.created_at.slice(0,10)}
      </button>
    </div>
  );
};

export default ImportSong;
