import React from "react";
import { Redirect, withRouter } from "react-router-dom";


const Home = props => {
  // make sure when the user is logged in you need to redirect to the the proper user page
  return (
    <div>
      <Redirect to="/header" />
    </div>
  );
};

export default withRouter(Home);
