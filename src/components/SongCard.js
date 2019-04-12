import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PlayButton from './PureComponents/PlayButton'
class SongCard extends React.Component{
  state = {
    albumImage: [],
    playingURL: "",
    audio: null,
    playing: false,
  }

  componentDidMount = () => {
    const apiKey = '?apikey=MTU1YjllNjUtOTIwNi00MGJlLWJlOWMtZGYxMjJhZDI0NTk5&limit=10';
    const href = this.props.track.links.albums.href
    const url = `${href}${apiKey}`
    url
      ? fetch(url)
      .then(resp => resp.json())
      .then(albumsArr => {
        this.setState({
          albumImage: albumsArr
        })
      })
      : console.log('hi');
  }

//  componentDidUpdate(prestate, preprops){
//
//    if(this.props.currentAudio !== this.state.audio)
//    {
//      console.log("hit didupdate")
//      if(this.props.currentAudio){
//         console.log("hit didupdate 2")
//        this.props.currentAudio.pause()
//
//      }
//  }
// }
  playAudio(previewURL){
    // console.log('playing', this.state.playing);
    // if(this.state.playing === true){
    //   console.log("hit here")
    //   console.log("audio", this.state.audio)
    //   this.pauseAudio(this.state.playingURL)
    // }
    // if (this.state.playing === false) {
      let audio = new Audio(previewURL)
      audio.play()
      this.setState({
        playing: true,
        playingURL: previewURL,
        audio: audio
      })
    // }
      // },() => console.log('playing',this.state.playing))
    // }else {
    //   console.log('hit');
    //   this.pauseAudio(previewURL)
    // }

    // }else {
    //   this.state.audio.pause();
    //   audio.play();
    //   this.setState({
    //     playing: true,
    //     playingURL: previewURL,
    //     audio: audio
    //   })
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
  //why is album[0] undefined?
  //<img src={this.state.albumImage.albums[0].links.images.href}/>
  handleClick = (event) => {
    this.props.selectedTrackCard(this.props.track)
    this.setState({
      clicked: !this.state.clicked
    })
    this.props.history.push("/playlists/:name/:songname")
  }

  render(){
    // console.log('Song card props',this.props);
    return(
      <div>
        <div className="-info">
          <h2 className="song-name">{this.props.track.name}</h2>
          <h3 className="song-artist">{this.props.track.artistName}</h3>
          <h4 className="song-album-name">{this.props.track.albumName}</h4>
          <div>
          <button onClick={ () => this.playAudio(this.props.track.previewURL) }>PLAY</button>
          <button onClick={ () => this.pauseAudio(this.props.track.previewURL) }>PAUSE</button>
          <Link to={`/playlists/${this.props.currentPlaylist.name}/${this.props.track.name}`}>
            <button onClick={this.handleClick}>View Song</button>
          </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SongCard);
