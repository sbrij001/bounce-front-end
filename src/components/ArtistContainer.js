import React from 'react'
import ArtistCard from './ArtistCard'
import { withRouter } from 'react-router-dom';


class ArtistContainer extends React.Component{
  state = {
    Artist: []
  }
  render(){
    return(
      <div>
        <h1>Artist Container</h1>
        <ArtistCard/>
      </div>
    )
  }
}

export default withRouter(ArtistContainer);
