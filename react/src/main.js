import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import data from './constants/data';

$(function() {
  let edit = document.getElementById('edit');
  if (edit) {
    ReactDOM.render(
      <App
        data={data}
        songId={parseInt(edit.dataset.id)}
        width={15}
      />,
      edit
    );
  }
  let view = document.getElementById('view');
  if (view) {
    ReactDOM.render(
      <div>
      <p>VIEW</p>
      <App
        data={data}
        songId={parseInt(view.dataset.id)}
        width={15}
      />
      </div>,
      view
    );
  }
});
