import React from "react";
import { Link, withRouter } from "react-router-dom";
import '/Users/shivanibrijmohan/Development/code/Mod5/bloc/bloc-front-end/src/style/sass/components/main.scss'
import MapBox from './MapBox'
//style
import header from '/Users/shivanibrijmohan/Development/code/Mod5/bloc/bloc-front-end/src/style/header.css';

const Header = props => {
  return (
    <div>
    <header className="header">
      <div className="triangle first"></div>
      <div className="triangle second"></div>

      <svg width='0' height='0'>
      <defs>
      <clipPath id="cp" clipPathUnits="objectBoundingBox">
      <path d="M0.500, 0.945 L0.994, 0.090 L0.006, 0.090 L0.500, 0.945 L0.500, 0.650 L0.262, 0.238 L0.738, 0.237 L0.500, 0.650z"></path>
      </clipPath>
      </defs>
      </svg>

      <div className="text-box">
        <h1 className="heading-primary">
          <span className="heading-primary-main">Bounce</span>
          <span className="heading-primary-sub">Bacon ipsum dolor amet short loin drumstick</span>
        </h1>

        <Link to={`/webplayer/`}>
          <a href="/webplayer" className="btn btn-white btn-animated"> Discover Music </a>
        </Link>


      </div>

    </header>

  </div>
  );
};

export default withRouter(Header);
