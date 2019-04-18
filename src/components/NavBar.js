import React from "react";
import { Link, withRouter } from "react-router-dom";

const Navbar = props => {
  return (
    <ul>
      <Link to="/webplayer">
        <li>Home</li>
      </Link>
      <Link to="/playlists">
        <li>Playlists</li>
      </Link>
      <Link to="/signup">
        <li>Sign Up</li>
      </Link>
      <Link to="/login">
        <li>Log In</li>
      </Link>
      <Link to="/header">
        <li>header</li>
      </Link>
      <Link to="/webplayerlist">
        <li>chat</li>
      </Link>
      <Link to="/homeexample">
        <li>homeexample</li>
      </Link>
      <li onClick={() => {
        localStorage.removeItem("token");
        props.history.push("/signup");
      }}>Log Out</li>
    </ul>
  );
};

export default withRouter(Navbar);
