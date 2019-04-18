import React from 'react';
import { Link, withRouter } from "react-router-dom";

class NewNav extends React.Component{
  render(){
    return(
      <div className="navigation">
      <input type="checkbox" className="navigation__checkbox" id="navi-toggle"/>

      <label for="navi-toggle" className="navigation__button">
        <span className="navigation__icon">&nbsp;</span>
      </label>

      <div className="navigation__background">&nbsp;</div>

      <nav className="navigation__nav">
        <ul className="navigation__list">
        <Link to="/webplayer">
          <li className="navigation__item"><a href="/webplayer" className="navigation__link">Home </a></li>
        </Link>
        <Link to="/webplayer">
          <li className="navigation__item"><a href="/login" className="navigation__link">LOGIN </a></li>
        </Link>
        <Link to="/playlists">
          <li className="navigation__item"><a href="/playlists" className="navigation__link">Playlist</a></li>
        </Link>
        <Link to="/header">
          <li className="navigation__item"><a href="/header" className="navigation__link">Header</a></li>
        </Link>
        <Link to="/webplayerlist">
        <li className="navigation__item"><a href="/chat" className="navigation__link">Chat</a></li>
        </Link>
        </ul>
      </nav>
      </div>
    )
  }

}
export default NewNav;
