import React from 'react';

const Note  = props => {

  let note = "---";
  if (props.note.length == 1){
    note = note + props.note + "--";
  } else if (props.note.length == 2){
    note = note + props.note + "-";
  } else if (props.note.length == 0){
    note = note + "---";
  }

  return(
    <div className='inline-block'>
      <p className='text'>
        {note}
      </p>
    </div>
  );
};

export default Note;
