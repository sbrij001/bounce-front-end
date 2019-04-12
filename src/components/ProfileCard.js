import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class ProfileCard extends React.Component{
  // state = {
  //
  // }

  //when linking to specific songs
  //put the song with the name before /songs in the switch statement in app.
  // <Link to={`/songs/${song.name}`}>
  render(){
    return(
      <h3>Profile Card</h3>
    )
  }
}
export default withRouter(ProfileCard);
