import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { API_ROOT, HEADERS } from '../constants';
import { Button, Image, List } from 'semantic-ui-react';
//css
import '../style/sass/components/songCard.scss';
class SongCard extends React.Component{
  state = {
    albumImage: [],
    playingURL: "",
    audio: null,
    playing: false,
    title: null,
    songArtist: null
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

  //plays song and updates the webplayer in the backend with the song title and artist.
  playAudio(previewURL,trackName,user){
    // console.log('trackname', trackName);
    // console.log(this.props);
    console.log('in play audio', user)
      let audio = new Audio(previewURL)
      audio.play()
      this.setState({
        playing: true,
        playingURL: previewURL,
        audio: audio,
        title: trackName
      })
      fetch(`${API_ROOT}/webplayers`, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({
          title: trackName,
          user_id: user.id
        })
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

  //why is album[0] undefined?
  //<img src={this.state.albumImage.albums[0].links.images.href}/>
  handleClick = (event) => {
    this.props.selectedTrackCard(this.props.track)
    this.setState({
      clicked: !this.state.clicked
    })
    this.props.history.push("/playlists/:name/:songname")
  }

  //play and pause buttons
  // <button onClick={ () => this.playAudio(this.props.track.previewURL, this.props.track.name, this.props.user) }>PLAY</button>
  // <button onClick={ () => this.pauseAudio(this.props.track.previewURL) }>PAUSE</button>
  render(){
    console.log('Song card props',this.props);
    return(
      <div className="song">
      <List inverted divided verticalAlign='middle' >

        <List.Item>
          <List.Content floated='right'>
          <Link to={`/playlists/${this.props.currentPlaylist.name}/${this.props.track.name}`}>
          <Button inverted color='teal' onClick={this.handleClick}> View Song</Button>
          </Link>
          </List.Content>
          <Image classname="img" avatar src="https://media.giphy.com/media/fTaq9ZRtm5Qsg/giphy.gif" />
          <List.Content> {this.props.track.name}   |   |   {this.props.track.artistName} </List.Content>
          <List.Content></List.Content>
        </List.Item>
      </List>
      </div>

    )
  }
}

export default withRouter(SongCard);
