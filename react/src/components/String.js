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

    let entry = this.props.entry;
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
          <div className={this.props.hidden}>
            <form className="form">
              <input id={this.props.id} onChange={this.props.handleEnter} type="text"/>
            </form>
          </div>
        </div>
        <div className='text columns small-11'>
          <div className='inline-block'>
              {this.props.open}|-{notes}-
          </div>
          <div className='inline-block entry'>
            <div className={this.props.hidden}>
              --{entry}--
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default String;
