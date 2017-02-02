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
    <div className="App row">
      <div className='text'>
        <div className='inline-block'>
            {props.open}|-{notes}-
        </div>
      </div>
    </div>
  );
};

export default StringView;
