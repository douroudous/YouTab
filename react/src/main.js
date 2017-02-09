import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import NewSong from './components/NewSong';
import App from './components/App';
import AppView from './components/AppView';
import data from './constants/data';

$(function() {
  let newSong = document.getElementById('new_song');
  if (newSong) {
    ReactDOM.render(
      <NewSong
        artistId={parseInt(newSong.dataset.id)}
      />,
      newSong
    );
  }
  let edit = document.getElementById('edit');
  if (edit) {
    ReactDOM.render(
      <App
        data={data}
        songId={parseInt(edit.dataset.id)}
        width={40}
      />,
      edit
    );
  }
  let view = document.getElementById('view');
  if (view) {
    ReactDOM.render(
      <div>
      <AppView
        data={data}
        songId={parseInt(view.dataset.id)}
        width={5}
      />
      </div>,
      view
    );
  }
});
