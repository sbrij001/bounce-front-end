import React from 'react';
import PlaylistCard from './PlaylistCard';
import UserPlaylistCard from './PlaylistCard';
import { withRouter } from 'react-router-dom';
import MapBox from './MapBox';
//css
import header from '../style/sass/components/container.scss';

class WebPlayer extends React.Component{
  state = {
    top: [],
    allPlaylists: [],
    favPlayistId: [],
    userPlaylists: []
  }

  componentDidMount = () => {
    let token = localStorage.token
    //top playlist
    Object.keys(this.props.user).length > 0
    ? fetch("http://api.napster.com/v2.2/playlists/top?apikey=MTU1YjllNjUtOTIwNi00MGJlLWJlOWMtZGYxMjJhZDI0NTk5&limit=6")
    .then(resp => resp.json())
    .then(topPlaylist => {
      this.setState({
        top: topPlaylist.playlists
      })
    })
    : this.props.history.push("/login")
    // top albums
    Object.keys(this.props.user).length > 0
    ? fetch("http://api.napster.com/v2.2/playlists?apikey=MTU1YjllNjUtOTIwNi00MGJlLWJlOWMtZGYxMjJhZDI0NTk5&limit=-2")
    .then(resp => resp.json())
    .then(allPlaylists => {
      this.setState({
        allPlaylists: allPlaylists.playlists
      })
    })
    : this.props.history.push("/login")
    //fetch to get user playlists
    Object.keys(this.props.user).length > 0
    ? fetch("http://localhost:3000/api/v1/user_playlists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    .then(resp => resp.json())
    .then(favPlayist => {
      this.setState({
        favPlayistId: favPlayist
      })
      this.state.favPlayistId.forEach((playlistObj) => {
        let playlistId = playlistObj.napster_playlist_id
        fetch(`http://api.napster.com/v2.2/playlists/${playlistId}?apikey=MTU1YjllNjUtOTIwNi00MGJlLWJlOWMtZGYxMjJhZDI0NTk5`)
        .then(resp => resp.json())
        .then(playlistObj => {
          this.setState({
            userPlaylists: [playlistObj.playlists[0], ...this.state.userPlaylists]
          })
        })
      })


    })
    : this.props.history.push("/login")
  }




  // USE TO GET THE TRACKS FOR A USER PLAYLIST
  // .then(playlistObj => {
  //   fetch(playlistObj.playlists[0].links.tracks.href + "?apikey=MTU1YjllNjUtOTIwNi00MGJlLWJlOWMtZGYxMjJhZDI0NTk5&limit=10")
  //   .then(resp => resp.json())
  //   .then(tracksArr => {
  //     this.setState({
  //       userPlaylists: tracksArr.tracks
  //     })
  //   })
  // })






// http://api.napster.com/v2.2/playlists/pp.125821370?apikey=YTkxZTRhNzAtODdlNy00ZjMzLTg0MWItOTc0NmZmNjU4Yzk4

// https://api.napster.com/v2.2/playlists/pp.224772103/tracks?apikey=MTU1YjllNjUtOTIwNi00MGJlLWJlOWMtZGYxMjJhZDI0NTk5
  // getPlaylistsIds = () => {
  //   consr this.state.favPlayistId.map(playlist => playlist.napster_playlist_id)
  // }
  renderTopToPage = () => {
    const newArr = this.state.top.map( playlist => {
      return <PlaylistCard key={playlist.id} playlist={playlist} selectedPlaylistCard={this.props.selectedPlaylistCard} currentPlaylist={this.props.currentPlaylist} handleClickForPostingSongToWebplayer={this.props.handleClickForPostingSongToWebplayer} />
    })
      return newArr
  }
  renderAllPlaylistsToPage = () => {
    const newArr = this.state.allPlaylists.map( playlist => {
      return <PlaylistCard key={playlist.id} playlist={playlist} selectedPlaylistCard={this.props.selectedPlaylistCard} currentPlaylist={this.props.currentPlaylist} addPlayistToUser={this.addPlayistToUser} handleClickForPostingSongToWebplayer={this.props.handleClickForPostingSongToWebplayer}/>
    })
      return newArr
  }

  renderUserPlaylistToPage = () => {
    console.log('userPlaylists', this.state.userPlaylists);
    const newArr = this.state.userPlaylists.map( playlist => {
      return <UserPlaylistCard key={playlist.id} playlist={playlist} currentPlaylist={this.props.currentPlaylist} selectedPlaylistCard={this.props.selectedPlaylistCard} addPlayistToUser={this.addPlayistToUser}/>
    })
      return newArr
  }


  render(){


    console.log('WEBPLAYER PROPS', this.props);
    return(
      <div className="webplayer">
        <div>
        <h2>Recently Played</h2>
        {this.renderUserPlaylistToPage()}
        </div>
        <div>
        <h2>Top</h2>
        {this.renderTopToPage()}
        </div>
        <div>
        <h2>A Little Bit Of Everything</h2>
        {this.renderAllPlaylistsToPage()}
        </div>
        <MapBox/>
      </div>
    )
  }
}



export default withRouter(WebPlayer);
