import React from 'react';
import Track from './Track';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      title: "",
      artist: "",
      song: ""
    };
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

  handleAdd(chord) {
    let song = this.state.song;
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

    return(
      <div>
        <h3>{this.state.title} - {this.state.artist}</h3>
        <Track
          strings={this.props}
          song={this.state.song}
          handleAdd={this.handleAdd}
          handleSave={this.handleSave}
        />
      </div>
    );
  }
}

export default App;
