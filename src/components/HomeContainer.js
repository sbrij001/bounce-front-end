import React from 'react';
import Sidebar from './Sidebar';
import WebPlayerNew from './WebPlayerNew';
import Streaming from './Streaming';

//scss files
import '../style/sass/components/base.scss'
import '../style/sass/components/webplayer.scss'

class HomeContainer extends React.Component{


  render(){
    console.log('Home Container props', this.props);
    return(
      <div className="container">
        <Sidebar/>
        <WebPlayerNew user={this.props.user} currentPlaylist={this.props.currentPlaylist} selectedPlaylistCard={this.props.selectedPlaylistCard} handleClickForPostingSongToWebplayer={this.props.handleClickForPostingSongToWebplayer} addPlayistToUser={this.props.addPlayistToUser}/>
      </div>
    )
  }
}
export default HomeContainer;
