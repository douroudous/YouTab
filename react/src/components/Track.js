import React from 'react';
import String from './String';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      chord: new Array(this.props.strings.data.length)
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let string = event.target.id;
    let fret = parseInt(event.target.value);
    let chord = this.state.chord;
    if (!isNaN(fret)){
      chord[string] = fret;
    } else {
      chord[string] = "";
    }
    this.setState({ chord: chord});
  }

  render() {

    let strings = this.props.strings.data.map (string => {

      let song = this.props.song;
      let stringNumber = string.id;
      let stringLine = [];
      let stringNote = {};
      let note;
      for (let i = 0; i < song.length; i++) {
          note = song[i].split(',');
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
          entry={this.state.chord[stringNumber]}
          handleFormSubmit={this.handleFormSubmit}
        />
      );
    });

      return (
        <div className="page">
          <ul>
            {strings}
          </ul>
          <button className="button" onClick={() => this.props.handleAdd(this.state.chord)}>Add</button><br/>
          <button className="button" onClick={() => this.props.handleSave()}>Save</button><br/>
        </div>
      );
  }
}

export default Track;