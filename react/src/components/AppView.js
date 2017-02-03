import React from 'react';
import TrackView from './TrackView';

class AppView extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      title: "",
      artist: "",
      song: "",
    };
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


  render() {
    let width = this.props.width;
    let song = this.state.song;
    let tracks = [];
    let trackNotes = [];
    let trackCount = Math.ceil(song.length/width);
    if (trackCount == 0) {
      trackCount = 1;
    }
    for (let i = 0; i < trackCount; i++) {
      trackNotes = song.slice(i * width, (i + 1) * width);
      let track = <TrackView
                    key = {i}
                    id = {i}
                    strings={this.props}
                    song={trackNotes}
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
      </div>
    );
  }
}

export default AppView;
