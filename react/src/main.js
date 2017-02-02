import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import data from './constants/data';

$(function() {
  let app = document.getElementById('app');
  if (app) {
    ReactDOM.render(
      <App
        data={data}
        songId={parseInt(app.dataset.id)}
        width={15}
      />,
      app
    );
  }
});
