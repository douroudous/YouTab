import React from 'react';
import Track from './Track';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      title: "",
      artist: "",
      song: "",
      chord: new Array(this.props.data.length)
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentWillMount() {
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
    if (!isNaN(fret) && fret < 26){
      chord[string] = fret;
    } else {
      chord[string] = "";
    }
    this.setState({ chord: chord});
  }

  handleClear() {
    $('form').each(function() {
      this.reset();
    });
    this.setState({ chord: new Array(this.props.data.length)});
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
    let width = this.props.width;
    let song = this.state.song;
    let tracks = [];
    let trackNotes = [];
    let hidden;
    let trackCount = Math.ceil(song.length/width);
    if (trackCount == 0) {
      trackCount = 1;
    }
    for (let i = 0; i < trackCount; i++) {
      hidden = "";
      trackNotes = song.slice(i * width, (i + 1) * width);
      if (i < trackCount - 1) {
        hidden = 'hidden';
      }
      // when a new Track begins, clear entry when there are no notes on track yet
      // wont be able to do it by checking where i am
      // check notes.length
      // but add other logic to clear the chord
      let track = <Track
                    key = {i}
                    id = {i}
                    strings={this.props}
                    song={trackNotes}
                    chord={this.state.chord}
                    hidden={hidden}
                    handleEnter={this.handleEnter}
                    handleClear={this.handleClear}
                  />;
      tracks.push(track);
    }

    return(
      <div>
        <h3>{this.state.title} - {this.state.artist}</h3>
        <br/>
        <ul>
          {tracks}
        </ul>
        <ul>
        <button className="button" onClick={() => this.handleAdd()}>Add</button><br/>
        <button className="button" onClick={() => this.handleClear()}>Clear</button><br/>
        <button className="button" onClick={() => this.handleSave()}>Save</button><br/>
        </ul>
      </div>
    );
  }
}

export default App;
