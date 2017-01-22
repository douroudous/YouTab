import React from 'react';
import String from './String';

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      chord: ["","","","","",""]
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let string = event.target.id;
    let fret = event.target.value;
    let chord = this.state.chord;
    if (fret){
      chord[string] = parseInt(fret);
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
      for (let note of song) {
        note = note.split(',');
        stringLine.push(note[stringNumber]);
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
          <h1>Guitar Tabs</h1>
          <ul>
            {strings}
          </ul>
          <button className="button" onClick={() => this.props.handleAdd(this.state.chord)}>Add</button><br/>
        </div>
      );
  }
}

export default Tab;
