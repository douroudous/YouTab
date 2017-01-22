import React from 'react';
import Tab from './Tab';

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
        <Tab
          strings={this.props}
          song={this.state.song}
          handleAdd={this.handleAdd}
        />
      </div>
    );
  }
}

export default App;
