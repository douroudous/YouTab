import React from 'react';
import Track from './Track';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      title: "",
      artist: "",
      song: "",
      chord: new Array(this.props.data.length),
      editStringId: "",
      editNoteId: "",
      editNote: "",
      editBox: "hidden"
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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
        this.setState({ title: body.title,
                        artist: body.artist,
                        song: body.tab});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSelect(event) {
    let editNoteId = event.target.id;
    let editNote = event.target.innerHTML;
    let editStringId = event.target.attributes.value.value;
    let chordArray = this.state.song[editNoteId].split(",");
    document.getElementsByClassName("edit-box")[0].value = editNote;
    this.setState({ editStringId: editStringId,
                    editNoteId: editNoteId,
                    editNote: editNote,
                    editBox: ""});

    // this handler will only make a box pop up with the note we're editing
    // also will highlight note we're editing
    // eventually will create another handler update song
    // this.setState({ song: song});

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
      let track = <Track
                    key = {i}
                    id = {i}
                    strings={this.props}
                    song={trackNotes}
                    chord={this.state.chord}
                    hidden={hidden}
                    handleEnter={this.handleEnter}
                    handleClear={this.handleClear}
                    handleSelect={this.handleSelect}
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
        <button className="button columns small-2" onClick={() => this.handleAdd()}>Add</button>
        <button className="button columns small-2" onClick={() => this.handleClear()}>Clear</button>
        <button className="button columns small-2" onClick={() => this.handleSave()}>Save</button>
        <div className={this.state.editBox}>
          <form className='columns small-2'>
            <input className='edit-box' id={this.props.id} onChange={this.props.handleEnter} type="text"/>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
