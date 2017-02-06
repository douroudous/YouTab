import React from 'react';
import Note from './Note';

class String extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let notes = this.props.stringLine.map (note => {
      return(
        <Note
          key = {note.id}
          id = {note.id}
          stringId = {this.props.id}
          note = {note.note}
          trackId = {this.props.trackId}
          editTrackId={this.props.editTrackId}
          editStringId={this.props.editStringId}
          editNoteId={this.props.editNoteId}
          handleSelect={this.props.handleSelect}
        />
      );
    });

    return(
      <div className="App text row">
          <div className='inline-block'>
              {this.props.open}|--{notes}
          </div>
      </div>
    );
  }
}

export default String;
