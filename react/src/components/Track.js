import React from 'react';
import String from './String';

class Track extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.handleClear();
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
          entry={this.props.chord[stringNumber]}
          hidden={this.props.hidden}
          trackId = {this.props.id}
          editTrackId={this.props.editTrackId}
          editStringId={this.props.editStringId}
          editNoteId={this.props.editNoteId}
          handleEnter={this.props.handleEnter}
          handleClear={this.props.handleClear}
          handleSelect={this.props.handleSelect}
        />
      );
    });


      return (
        <div className="page">
          <br/>
          <ul>
            {strings}
          </ul>
        </div>
      );
  }
}

export default Track;
