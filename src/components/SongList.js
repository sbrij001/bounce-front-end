import React from 'react';
import SongCard from './SongCard';
import { Link, withRouter } from 'react-router-dom';
//withRouter gives the app the props
class SongList extends React.Component{
  state = {
    trackList: [],
    // currentAudio: null
  }

 // handleSelectedAudio =(audio)=>{
 //   this.setState({
 //     currentAudio: audio
 //   })
 // }

  componentDidMount = () => {
    const apiKey = '?apikey=MTU1YjllNjUtOTIwNi00MGJlLWJlOWMtZGYxMjJhZDI0NTk5&limit=10';
    const href = this.props.currentPlaylist.links.tracks.href
    const url = `${href}${apiKey}`
    console.log('URL THAT IM GETTING',url);
    url
      ? fetch(url)
      .then(resp => resp.json())
      .then(tracksData => {
        this.setState({
          trackList: tracksData.tracks
        })
      })
      : console.log('hi');
  }

  renderTracks = () => {
      const newArr = this.state.trackList.map(track => {
        return <SongCard key={track.id} track={track} selectedTrackCard={this.props.selectedTrackCard} currentPlaylist={this.props.currentPlaylist} user={this.props.user}/>
      })
      return newArr
  }

  savePlaylist = (event) => {
    let token = localStorage.token
    fetch("http://localhost:3000/api/v1/user_playlists", {

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        user_playlist: {
          user_id: this.props.user.user.id,
          napster_playlist_id: this.props.currentPlaylist.id,
          playlist_id: 1
        }
      })
    })
    .then(resp => resp.json())
    .then(playlist => {
      console.log(this.props.user.user.id)
      this.props.addPlayistToUser(this.state)
    })
  }

  render(){
    // debugger
    console.log("SongList props", this.props);
    return(
      <div>
      <h1>Song List</h1>
      <button onClick={this.savePlaylist}>Add Playlist To Library</button>
      {this.renderTracks()}
      </div>
    )
  }
}


export default withRouter(SongList);
