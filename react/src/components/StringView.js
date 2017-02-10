import React from 'react';
import NoteView from './NoteView';

const StringView  = props => {

  let notes = props.stringLine.map (note => {
    return(
      <NoteView
        key = {note.id}
        id = {note.id}
        note = {note.note}
      />
    );
  });

  return(
    <div className="App tabs-text">
        <div className='inline-block'>
            {props.open}|--
        </div>
        <div className='inline-block'>
            {notes}
        </div>
    </div>
  );
};

export default StringView;
