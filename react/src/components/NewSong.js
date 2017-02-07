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
      existingSong: "display-none"
    };
    this.handleNewSong = this.handleNewExisting.bind(this);
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
                    existingSong: existingSong});
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
        <div className="centered">
        <button className="button" onClick={() => this.handleNewExisting("new")}>New Song</button>
        <button className="button" onClick={() => this.handleNewExisting("existing")}>Existing Song</button>
        </div>
        <div className={this.state.newSong}>
          <p className="text centered">
            Enter new song title here
          </p>
        </div>
        <ul className={this.state.existingSong}>
          {songs}
        </ul>
      </div>
    );
  }
}

export default NewSong;
