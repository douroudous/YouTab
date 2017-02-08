import React from 'react';
import Song from './Song';

class NewSong extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      artist: "",
      allSongs: "",
      uniqueSongs: "",
      newSong: "display-none",
      existingSong: "display-none",
      importSong: "display-none",
      options: "",
      backButton: "display-none",
      newSongTitle: "",
      importOption: ""
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleSubmitNew = this.handleSubmitNew.bind(this);
    this.handleSubmitExisting = this.handleSubmitExisting.bind(this);
    this.handleSubmitImport = this.handleSubmitImport.bind(this);
    this.handleSelectImport = this.handleSelectImport.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch(`/api/v1/artists/${this.props.artistId}/songs/new.json`,
      { method: 'get',
        credentials: 'include',
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
        this.setState({ artist: body.artist,
                        allSongs: body.allSongs,
                        uniqueSongs: body.uniqueSongs});
                      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleToggle(event) {
    let newSong = "";
    let existingSong = "";
    let importSong = "";
    let importOption = "";
    if (event == "new") {
      existingSong = "display-none"
      importSong = "display-none"
    }
    else if (event == "existing"){
      newSong = "display-none"
      importSong = "display-none"
      importOption = this.handleSubmitExisting
    } else {
      newSong = "display-none"
      existingSong = "display-none"
      importOption = this.handleSubmitImport
    }
    this.setState({ newSong: newSong,
                    existingSong: existingSong,
                    importSong: importSong,
                    options: "display-none",
                    backButton: "",
                    importOption: importOption});
  }

  handleBack() {
    this.setState({ newSong: "display-none",
                    existingSong: "display-none",
                    importSong: "display-none",
                    options: "",
                    backButton: "display-none"});
  }

  handleSubmitExisting(event) {
    alert(`${event} was entered`);
    let data = {
        title: event,
    };
    let songData = JSON.stringify(data);
    fetch(`/api/v1/artists/${this.props.artistId}/songs.json`,
      { method: 'post',
        body: songData,
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

  handleSubmitImport(event) {
    // display only the versions of the song and a back button
    let songs = this.state.allSongs;
    let matches = [];
    for (let song of songs) {
      if (event == song.title) {
        matches.push(song);
      }
    }
    this.setState({ uniqueSongs: matches,
                    newSong: "display-none",
                    existingSong: "display-none",
                    importSong: "",
                    options: "display-none",
                    backButton: ""});
  }

  handleSelectImport(event) {
    alert(`${event} was entered`);
    // import tab into data
    let data = {
        title: event,
    };
    let songData = JSON.stringify(data);
    fetch(`/api/v1/artists/${this.props.artistId}/songs.json`,
      { method: 'post',
        body: songData,
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

  handleSubmitNew(event) {
    alert(`${this.state.newSongTitle} was entered`);
    let data = {
        title: this.state.newSongTitle,
        version: 1
    };
    let songData = JSON.stringify(data);

    fetch(`/api/v1/artists/${this.props.artistId}/songs.json`,
      { method: 'post',
        body: songData,
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

  handleChange(event) {
    this.setState({newSongTitle: event.target.value});
  }

  render() {
    let songs = [];
    let uniqueSongs = this.state.uniqueSongs;
    if (uniqueSongs.length > 0) {
      for (let i = 0; i < uniqueSongs.length; i++) {
        let song = <Song
                      key = {i}
                      id = {i}
                      song = {uniqueSongs[i]}
                      handleSubmit={this.state.importOption}
                    />;
        songs.push(song);
      }
    }

    return(
      <div>
        <div className={this.state.options}>
          <div className="text centered">
            <button className="button" onClick={() => this.handleToggle("new")}>New</button><br/>
            <button className="button" onClick={() => this.handleToggle("existing")}>Existing</button><br/>
            <button className="button" onClick={() => this.handleToggle("import")}>Import from Existing Tab</button>
          </div>
        </div>
        <div className={this.state.newSong}>
          <form className="text" onSubmit={this.handleSubmitNew}>
            <label>Enter new song title:</label>
            <input className='edit-box' type="text"  value={this.state.value} onChange={this.handleChange}/>
            <input type="submit"/>
          </form>
        </div>
        <div className={this.state.existingSong}>
          {songs}
        </div>
        <div className={this.state.importSong}>
          {songs}
        </div>
        <div className={this.state.backButton}>
          <div className="text centered">
            <button className="button" onClick={() => this.handleBack("new")}>Back</button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewSong;
