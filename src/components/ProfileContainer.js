import React from 'react'
import ProfileCard from './ProfileCard'
import { withRouter } from 'react-router-dom';
class ProfileContainer extends React.Component{
  state = {
    profiles: []
  }
  render(){
    return(
      <div>
      <h1>Profile Container</h1>
      <ProfileCard/>
      </div>
    )
  }
}

export default withRouter(ProfileContainer);
