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

    let stringClass = "inline-block string-" + this.props.id;

    return(
      <div className="App tabs-text">
          <div className='inline-block'>
              {this.props.open}|--
          </div>
          <div className={stringClass}>
              {notes}
          </div>
      </div>
    );
  }
}

export default String;
