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
      editTrackId: "",
      editStringId: "",
      editNoteId: "",
      editNote: "",
      editBox: "hidden"
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
    let editStringId= event.target.dataset.string;
    let editTrackId= event.target.dataset.track;
    let chordArray = this.state.song[editNoteId].split(",");
    document.getElementsByClassName("edit-box")[0].value = editNote;
    this.setState({ editTrackId: editTrackId,
                    editStringId: editStringId,
                    editNoteId: editNoteId,
                    editNote: editNote,
                    editBox: ""});
  }

  handleEdit(event) {
    let song;
    this.setState({ song: song});
  }

  handleDelete(event) {
    let song;
    this.setState({ song: song});
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
                    editTrackId={this.state.editTrackId}
                    editStringId={this.state.editStringId}
                    editNoteId={this.state.editNoteId}
                    handleEnter={this.handleEnter}
                    handleClear={this.handleClear}
                    handleSelect={this.handleSelect}
                  />;
      tracks.push(track);
    }

    return(
      <div className="animated fadeIn">
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
            <input className='edit-box' type="text"/>
          </form>
          <button className="button columns small-2" onClick={() => this.handleEdit()}>Edit Note</button>
          <button className="button columns small-2" onClick={() => this.handleDelete()}>Delete Note</button>
        </div>
      </div>
    );
  }
}

export default App;
