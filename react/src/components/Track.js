import React from 'react';
import String from './String';

class Track extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {

    let strings = this.props.strings.data.map (string => {

      let song = this.props.song;
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
        <String
          key = {stringNumber}
          id = {stringNumber}
          open={string.open}
          stringLine={stringLine}
          hidden={this.props.hidden}
          trackId = {this.props.id}
          editTrackId={this.props.editTrackId}
          editStringId={this.props.editStringId}
          editNoteId={this.props.editNoteId}
          handleSelect={this.props.handleSelect}
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
  }
}

export default Track;
