import React from 'react'
import { withRouter } from 'react-router-dom';
import Wavelength from './Wavelength'
import { Button, Icon } from 'semantic-ui-react';

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
      <div id="card">
        <div class="ui centered card">
          <div class="image">
            <img src="https://media.idownloadblog.com/wp-content/uploads/2018/03/Apple-Music-icon-001.jpg"/>
            <Wavelength/>
          </div>
          <div class="content">
            <p className="description">Name: {this.props.currentSong.name}</p>
            <p className="description">Album: {this.props.currentSong.albumName}</p>
          </div>
          <Button.Group icon>
          <Button onClick={ () => this.playAudio(this.props.currentSong.previewURL) }>
            <Icon name='play' />
          </Button>
          <Button onClick={ () => this.pauseAudio(this.props.currentSong.previewURL) }>
            <Icon name='pause' />
          </Button>
        </Button.Group>
        </div>
      </div>
    )
  }
}

export default withRouter(SongDetail);
