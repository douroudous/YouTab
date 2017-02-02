import React from 'react';
import Track from './Track';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      width: 4,
      title: "",
      artist: "",
      song: "",
      chord: new Array(this.props.data.length)
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    fetch(`/api/v1/songs/${this.props.songId}.json`,
      { method: 'get',
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} ($response.statusText)`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({title: body.title});
        this.setState({artist: body.artist});
        this.setState({song: body.tab});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleEnter(event) {
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

  handleAdd() {
    let song = this.state.song;
    let chord = this.state.chord;
    song.push(chord.join(','));
    this.setState({ song: song});
  }

  handleSave() {
    let data = {
        tab: this.state.song.join(";")
    };
    let jsonTab = JSON.stringify(data);

    fetch(`/api/v1/songs/${this.props.songId}.json`,
      { method: 'put',
        body: jsonTab,
        credentials: 'include'
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          let errorMessage = `${response.status} ($response.statusText)`,
            error = new Error(errorMessage);
            throw(error);
        }
      })
      .then(data => {
      })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let width = this.state.width;
    let song = this.state.song;
    let tracks = new Array(Math.ceil(song.length/width));
    let trackNotes;
    if (tracks.length > 0) {
      for (let i = 0; i < tracks.length; i++) {
        trackNotes = song.slice(i * width, (i + 1) * width);
        tracks[i] =
            <Track
                  key = {i}
                  id = {i}
                  strings={this.props}
                  song={trackNotes}
                  chord={this.state.chord}
                  handleEnter={this.handleEnter}
                />

      }
    }

    // let tracks = this.state.song.map (track => {
    //
    //   // let song = this.props.song;
    //   // let stringNumber = string.id;
    //   // let stringLine = [];
    //   // let stringNote = {};
    //   // let note;
    //   // for (let i = 0; i < song.length; i++) {
    //   //     note = song[i].split(',');
    //   //     stringNote = {
    //   //                   id: i,
    //   //                   stringNumber: stringNumber,
    //   //                   note: note[stringNumber]
    //   //                };
    //   //     stringLine.push(stringNote);
    //   // }
    //
    //   return(
    //     <Track
    //       //come up with unique keys
    //       //key = {stringNumber}
    //       //id = {stringNumber}
    //       strings={this.props}
    //       song={this.state.song}
    //       chord={this.state.chord}
    //       handleEnter={this.handleEnter}
    //     />
    //   );
    // });

    return(
      <div>
        <h3>{this.state.title} - {this.state.artist}</h3>
        <br/>
        <ul>
          {tracks}
        </ul>
        <button className="button" onClick={() => this.handleAdd()}>Add</button><br/>
        <button className="button" onClick={() => this.handleSave()}>Save</button><br/>
      </div>
    );
  }
}

export default App;
