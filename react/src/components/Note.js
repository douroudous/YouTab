import React from 'react';

const Note  = props => {

  let note = props.note;
  let noteBuffer;
  if (note.length == 1){
    noteBuffer = "--";
  } else if (note.length == 2){
    noteBuffer = "-";
  } else if (note.length == 0){
    noteBuffer = "---";
  }

  return(
    <div className='inline-block'>
      <span className='text'>---</span>
      <span className='text' id={props.id} value={props.stringId} onClick={props.handleSelect}>
        {note}
      </span>
      <span className='text'>{noteBuffer}</span>
    </div>
  );
};

export default Note;
