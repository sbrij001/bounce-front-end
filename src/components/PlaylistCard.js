import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SongList from './SongList'
import CardCSS from '/Users/shivanibrijmohan/Development/code/Mod5/bloc/bloc-front-end/src/style/CardCSS.css'
class PlaylistCard extends React.Component{
  state = {
    clicked: false
  }

//in order to get the selected playlist I call the callback function defined in app
// which sets the state of current playlist to the selected playlist
// in app I pass that currentPlaylist to the songList
  handleClick = (event) => {
    this.props.selectedPlaylistCard(this.props.playlist)
    this.setState({
      clicked: !this.state.clicked
    })
    this.props.history.push("/playlists/:name")

  }


  // console.log('PlaylistCard', `/playlists/${this.formattedName()}`);
  // console.log(this.formattedName());
  // console.log(this.props);
  // console.log('blerg', this.props.playlist.name);
    // formattedName = () => {return this.props.playlist.name.replace(' ', '-')}

  render(){
    //console.log('PlaylistCard',this.props.playlist);

    return(
      <div className="playlist  ">
        <Link to={`/playlists/${this.props.playlist.name}`}>
        <img className="playlist-image" src={this.props.playlist.images? this.props.playlist.images[0].url : null} onClick={this.handleClick}/>
        </Link>
        <div className="playlist-info">
          <h3 className="playlist-name">{ this.props.playlist.length ? this.props.playlist[0].name : this.props.playlist.name }</h3>
          <p className="playlist-description">{this.props.playlist.description}</p>
        </div>
      </div>
    )
  }
}
export default withRouter(PlaylistCard);
