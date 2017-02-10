import React from 'react';
import StringView from './StringView';

const TrackView  = props => {

  let strings = props.strings.data.map (string => {

    let song = props.song;
    let stringNumber = string.id;
    let stringLine = [];
    let stringNote = {};
    for (let i = 0; i < song.length; i++) {
        let note = song[i].split(',');
        stringNote = {
                      id: i,
                      stringNumber: stringNumber,
                      note: note[stringNumber]
                   };
        stringLine.push(stringNote);
    }

    return(
      <StringView
        key = {stringNumber}
        id = {stringNumber}
        open={string.open}
        stringLine={stringLine}
      />
    );
  });

    return (
      <div>
        <br/>
        <ul>
          {strings}
        </ul>
      </div>
    );
};

export default TrackView;
