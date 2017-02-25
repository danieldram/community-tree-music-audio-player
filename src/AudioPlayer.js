import React, { Component } from 'react';
//import logo from './logo.svg';
import WaveSurfer from 'wavesurfer.js'

import './AudioPlayer.css';

import {WaveformRender} from './components/audio-player'

class AudioPlayer extends Component {

  state={
    playState:false,
    seconds: 0,
    minutes: 0
  }

  constructor(props){
    super(props)
    this.props = props
    console.log(this.props)
  }

  onWindowChange(){
    window.addEventListener('resize', ()=>{

      this.wavesurfer.empty()
      setTimeout(()=>{
        this.wavesurfer.load(this.props.file)
      },200)

    }, true);

  }

  onWaveSurferChange(){
    this.wavesurfer.on('audioprocess', ()=>{
      let currentTime = this.wavesurfer.getCurrentTime()

      this.setState({
        seconds:(currentTime < 10) ? `0${parseInt(currentTime)}` : parseInt(currentTime),
        minutes:Math.floor(parseInt(currentTime)/60)
      })

    })
  }


  componentDidMount(){
    this.wavesurfer = WaveSurfer.create({container:'#waveform', waveColor:"#4ec0a9", progressColor:'#eee', barWidth:3})
    this.wavesurfer.load(this.props.file)
    this.setState({totalTime:this.wavesurfer.getDuration()})
    this.onWindowChange()
    this.onWaveSurferChange()

  }

  controlClickHandler = (evt) =>{
    evt.preventDefault();
    (!this.state.playState) ? this.wavesurfer.play() : this.wavesurfer.pause()

    this.setState({
      playState: !this.state.playState
    })
  }

  render() {
    return (
      <div className="AudioPlayer col-md-12 col-sm-12">
        <div className="audio-player-artwork col-md-1 col-sm-2">
          <img src={this.props.artwork} alt="nothing" />
        </div>
        <div className="audio-player-waveform-display col-md-10 col-sm-8">
            <WaveformRender />

        <div className="audio-player-information col-md-12 col-sm-12">
          <div className="audio-player-meta col-md-6">{this.props.artist} - {this.props.trackname}</div>
            <div className="audio-player-meta bottom align-right col-md-6">{this.state.minutes}:{this.state.seconds}</div>
        </div>

        </div>
        <div className="audio-player-controls col-md-1 col-sm-2">
          <i className={(!this.state.playState) ? "fa fa-play-circle" : "fa fa-pause"} onClick={this.controlClickHandler} aria-hidden="true"/>
        </div>
      </div>
    );
  }
}

export default AudioPlayer;
