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

  let entry = props.entry;
  if (isNaN(entry)) {
    entry = "";
  }
  if (entry.toString().length == 1){
    entry = entry + "-";
  } else if (entry.toString().length != 2){
    entry = "--";
  }

  return(
    <div className="App row">
      <div className='columns small-1'>
        <div className={props.hidden}>
          <form className="form">
            <input id={props.id} onChange={props.handleEnter} type="text"/>
          </form>
        </div>
      </div>
      <div className='text columns small-11'>
        <div className='inline-block'>
            {props.open}|-{notes}-
        </div>
        <div className='inline-block entry'>
          <div className={props.hidden}>
            --{entry}--
          </div>
        </div>
      </div>
    </div>
  );
};

export default String;
