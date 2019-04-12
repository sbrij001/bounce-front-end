import React from "react";
import { Redirect, withRouter } from "react-router-dom";


const Home = props => {
  // make sure when the user is logged in you need to redirect to the the proper user page
  return (
    <div>
          {Object.keys(props.user).length > 0 ? (
            <Redirect to="/playlists" />
          ) : (
            <h1>No User</h1>
          )}
    </div>
  );
};

export default withRouter(Home);
