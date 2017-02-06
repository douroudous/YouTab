import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import AppView from './components/AppView';
import data from './constants/data';

$(function() {
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
        width={15}
      />
      </div>,
      view
    );
  }
});
