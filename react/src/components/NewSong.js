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
      options: "",
      newSongTitle: ""
    };
    this.handleNewExisting = this.handleNewExisting.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleNewExisting(event) {
    let newSong = "";
    let existingSong = "";
    if (event == "new") {
      existingSong = "display-none"
    }
    else {
      newSong = "display-none"
    }
    this.setState({ newSong: newSong,
                    existingSong: existingSong,
                    options: "display-none"});
  }

  handleSubmit() {
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
                      title = {uniqueSongs[i]}
                    />;
        songs.push(song);
      }
    }

    return(
      <div>
        <div className={this.state.options}>
          <div className="text centered">
            <button className="button" onClick={() => this.handleNewExisting("new")}>New</button>
            <br/>
            <button className="button" onClick={() => this.handleNewExisting("existing")}>Existing</button>
          </div>
        </div>
        <div className={this.state.newSong}>
          <form className="text" onSubmit={this.handleSubmit}>
            <label>Enter new song title:</label>
            <input className='edit-box' type="text"  value={this.state.value} onChange={this.handleChange}/>
            <input type="submit"/>
          </form>
        </div>
        <div className={this.state.existingSong}>
          {songs}
        </div>
      </div>
    );
  }
}

export default NewSong;
