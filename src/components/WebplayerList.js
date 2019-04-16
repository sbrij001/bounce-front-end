import React from 'react';
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../constants';
import NewWebplayerForm from './NewWebplayerForm';
import UserSongsArea from './UserSongsArea';
import Cable from './Cable';


  // const webPlayer =

class WebplayerList extends React.Component {
  state = {
    webplayers: [],
    activeWebplayer: null
  };

  componentDidMount = () => {
    let token = localStorage.token
    fetch(`${API_ROOT}/webplayers`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    .then(resp => resp.json())
    .then( webplayers => {
      this.setState({ webplayers: webplayers })
    });
  };

  componentDidUpdate = (prevState) => {
    if (this.state.webplayers !== prevState.webplayers) {
      let token = localStorage.token
      fetch(`${API_ROOT}/webplayers`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        },
      })
      .then(resp => resp.json())
      .then( webplayers => this.setState({ webplayers: webplayers }));
    }
  }

  handleClick = id => {
    this.setState({ activeWebplayer: id });
  };

  handleRecievedWebplayer = response => {
    const { webPlayer } = response;
    this.setState({
        webplayers: [...this.state.webplayers, webPlayer ]
    });
  };

//sets up the chat to see who is in the chat
  handleRecievedUserSong = response => {
    const { userSong } = response;
    const webplayers = [...this.state.webplayers];
    const webplayer = webplayers.find(
      webplayer => webplayer.id === userSong.webplayer_id
    );
    webplayer.userSongs = [...webplayer.userSongs, userSong];
    this.setState({ webplayer })
  };


  render = () => {
    console.log('WEBPLAYERLIST', this.state.webplayers);
    const { webplayers, activeWebplayer } = this.state;
    return (
      <div className="webplayersList">
        <ActionCable
          channel={{ channel: 'webplayers_channel' }}
          onReceived={this.handleRecievedWebplayer}
        />
        {this.state.webplayers.length ? (
          <Cable
            webplayers={webplayers}
            handleRecievedUserSong={this.handleRecievedUserSong}
          />
        ) : null}
        <h2>Webplayers</h2>
        <ul>{mapWebplayers(webplayers, this.handleClick, this.props.user)}</ul>
        <NewWebplayerForm/>
        {activeWebplayer ? (
          <UserSongsArea
          webplayer={findActiveWebplayer(
            webplayers,
            activeWebplayer
          )}
          />
        ):null}
      </div>
    );
  };
}

export default WebplayerList;

// helpers

const findActiveWebplayer = (webplayers, activeWebplayer) => {
  return webplayers.find(
    webplayer => webplayer.id === activeWebplayer
  );
}

const mapWebplayers = (webplayers, handleClick, user) => {
  console.log('USER', user);
  return webplayers.map(webplayer => {
    console.log('in map webplayers',webplayer)
    return (
      <li key={webplayer.id} onClick={() => handleClick(webplayer.id)}>
        {webplayer.username} is listening to {webplayer.title}
      </li>
    );
  });
};
