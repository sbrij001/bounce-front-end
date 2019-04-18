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


        <div class="ui centered card">
          <div class="image">
            <img src="https://media.idownloadblog.com/wp-content/uploads/2018/03/Apple-Music-icon-001.jpg"/>
            <Wavelength/>
          </div>
          <div class="content">
            <p className="description">Name: {this.props.currentSong.name}</p>
            <p className="description">Album: {this.props.currentSong.albumName}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SongDetail);
