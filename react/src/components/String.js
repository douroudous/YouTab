import React from 'react';
import Note from './Note';

const String  = props => {

  let notes = props.stringLine.map (note => {
    return(
      <Note
        key = {note.id}
        id = {note.id}
        note = {note.note}
      />
    );
  });

  let entry = props.entry || "" ;
  if (entry.toString().length == 1){
    entry = entry + "---";
  } else if (entry.toString().length == 2){
    entry = entry + "--";
  } else {
    entry = "----";
  }

  return(
    <div className="App row">
      <div className='columns small-1'>
          <form className="form">
            <input id={props.id} onChange={props.handleFormSubmit} type="text"/>
          </form>
      </div>
      <div className='inline-block text columns small-11'>
          {props.open}|---{notes}--{entry}--
      </div>
    </div>
  );
};

export default String;
