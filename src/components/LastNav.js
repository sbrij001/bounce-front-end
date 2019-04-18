import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom';

//css
import '../style/sass/components/transparentNav.scss'
class LastNav extends Component {
  state = {}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu inverted className="nav">
        <Menu.Item as={Link} to="/webplayer" name='webplayer' active={activeItem === 'browse'} onClick={this.handleItemClick}>
          Home
        </Menu.Item>

        <Menu.Item as={Link} to="/playlists" name='Playlists' active={activeItem === 'submit'} onClick={this.handleItemClick}>
          Playlists
        </Menu.Item>

        <Menu.Item as={Link} to="/webplayerlist" name='streaming' active={activeItem === 'submit'} onClick={this.handleItemClick}>
          Streaming
        </Menu.Item>

        <Menu.Menu position='right'>
          <Menu.Item as={Link} to="/signup" name='signup' active={activeItem === 'signup'} onClick={this.handleItemClick}>
            Sign Up
          </Menu.Item>

          <Menu.Item as={Link} to="/login" name='login' active={activeItem === 'help'} onClick={this.handleItemClick}>
            Login
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    )
  }
}
export default withRouter(LastNav);
