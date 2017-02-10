import React from 'react';

const NoteView  = props => {

  let note = props.note;
  let noteBuffer;
  if (note.length == 1){
    noteBuffer = "--";
  } else if (note.length == 2){
    noteBuffer = "-";
  } else if (note.length == 0){
    note = "-";
    noteBuffer = "--";
  }

  return(
    <div className='inline-block'>
      <span>
        {note}
      </span>
      <span>{noteBuffer}</span>
    </div>

  );
};

export default NoteView;
