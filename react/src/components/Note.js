import React from 'react';

const Note  = props => {

  /*
  each note:
  spaces
  */
  let note = "---";
  if (props.note.length == 1){
    note = note + props.note + "--";
  } else if (props.note.length == 2){
    note = note + props.note + "-";
  } else if (props.note.length == ""){
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
