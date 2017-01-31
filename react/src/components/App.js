import React from 'react';
import Track from './Track';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      song: [],
    };
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(chord) {
    let song = this.state.song;
    song.push(chord.join(','));
    this.setState({ song: song});
  }

  render() {

    return(
      <div>
        <br/>
        <Track
          strings={this.props}
          song={this.state.song}
          handleAdd={this.handleAdd}
        />
      </div>
    );
  }
}

export default App;
