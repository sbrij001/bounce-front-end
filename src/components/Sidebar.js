import React from 'react';
import { Route, Switch, Link, withRouter } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'

//scss files
import '../style/sass/components/sidebar.scss'
import '../style/sass/components/base.scss'

class Sidebar extends React.Component {
  state = {
    menuOpen: false
  }

  // This keeps your state in sync with the opening/closing of the menu
  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})
  }

  // This can be used to close the menu, e.g. when a user clicks a menu item
  closeMenu () {
    this.setState({menuOpen: false})
  }

  // This can be used to toggle the menu, e.g. when using a custom icon
  // Tip: You probably want to hide either/both default icons if using a custom icon
  // See https://github.com/negomi/react-burger-menu#custom-icons
  toggleMenu () {
    this.setState({menuOpen: !this.state.menuOpen})
  }




  render () {
    console.log('side bar props',this.props);
    return (
      <div className="bm-menu-wrap" id="sidebar">
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={(state) => this.handleStateChange(state)}
        >
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
        </ul>
        </Menu>
      </div>
    );
  }
}
export default withRouter(Sidebar);
