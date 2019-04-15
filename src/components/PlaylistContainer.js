import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PlaylistCard from './PlaylistCard';
import SongCard from './SongCard';

//css
class PlaylistContainer extends React.Component{
  state = {
    playlistsArr: [],
  }


// first check if there is a user if there is fetch the data and display it on the page
// else push to the login
//this.state.playlistsArr.playlists[0].links.tracks
  componentDidMount = () => {
    Object.keys(this.props.user).length > 0
    ? fetch("http://api.napster.com/v2.2/playlists/featured?apikey=MTU1YjllNjUtOTIwNi00MGJlLWJlOWMtZGYxMjJhZDI0NTk5")
    .then(resp => resp.json())
    .then(playlistObj => this.setState({
      playlistsArr: playlistObj.playlists
    })
    )
    : this.props.history.push("/login")
  }

  renderPlaylistCard = () => {
    const newArr = this.state.playlistsArr.map( playlist => {
      return <PlaylistCard key={playlist.id} playlist={playlist} selectedPlaylistCard={this.props.selectedPlaylistCard} handleClickForPostingSongToWebplayer={this.props.handleClickForPostingSongToWebplayer}/>
    })
      return newArr
  }

  //render has it's own props => console.log("render props", renderProps.match.params.name );
  // render takes in a callback function
  // <Route path="/playlists/:name" render={() =>{} PlaylistCard}>
  render(){
    // console.log('playlistCard props', this.props);
    console.log('container', this.props);
    return(
      <div>
        <h1>Playlist Container</h1>
        <Route path="/https://api.napster.com/v2.2/playlists/" render={() => SongCard}/>
        {this.renderPlaylistCard()}
      </div>
    )
  }
}

export default withRouter(PlaylistContainer);
