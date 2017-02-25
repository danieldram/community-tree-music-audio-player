import React from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from './AudioPlayer';
import './index.css';

var root = document.getElementById('audio-player');
ReactDOM.render(
  <AudioPlayer {...(root.dataset)} />,
  document.getElementById('audio-player')
);
