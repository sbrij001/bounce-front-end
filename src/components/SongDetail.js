import React from 'react'
import { withRouter } from 'react-router-dom';
import Wavelength from './Wavelength'

class SongDetail extends React.Component{
  state = {
    playing: false,
    playingURL: "",
    audio: null,
    playing: false,
    title: ''
  }

  playAudio(previewURL){
    let audio = new Audio(previewURL)
    audio.play()
    this.setState({
      playing: true,
      playingURL: previewURL,
      audio: audio
    })
  }

  pauseAudio(previewURL){
    console.log("pause audio")
    let audio = new Audio(previewURL)
    if (this.state.playingURL === previewURL) {
      this.state.audio.pause()
      this.setState({
        playing: false
      }, ()=>console.log("set playing to false",this.state.playing))
    }
  }
  //
  // handleChange = e => {
  //   this.setState({ title: e.target.value })
  // };

  render(){
    console.log('song detail', this.props);
    return(
      <div>
        <h1>Song Details</h1>
        <h2>Name: {this.props.currentSong.name}</h2>
        <h3>Album: {this.props.currentSong.albumName}</h3>
        <button onClick={ () => this.playAudio(this.props.currentSong.previewURL) }>PLAY</button>
        <button onClick={ () => this.pauseAudio(this.props.currentSong.previewURL) }>PAUSE</button>
        <Wavelength/>
      </div>
    )
  }
}

export default withRouter(SongDetail);
