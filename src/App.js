import React, { Component } from 'react';
import { Route, Switch, withRouter } from "react-router-dom";


//Components
//need to have both the route and switch
//Switch stops at the first match
import Home from './components/Home';
import WebplayerList from './components/WebplayerList';
import WebPlayer from './components/WebPlayer';
import ProfileContainer from './components/ProfileContainer';
import PlaylistContainer from './components/PlaylistContainer';
import ArtistContainer from './components/ArtistContainer';
import AlbumContainer from './components/AlbumContainer';
import SongList from './components/SongList';
import SongCard from './components/SongCard';
import SongDetail from './components/SongDetail';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Error from './components/Error';
import NavBar from './components/NavBar';
import Header from './components/Header';

//css
import './App.css';

// <Route exact path="/playlists/:name" render={()=> <PlaylistContainer/>} />
class App extends Component {
  state = {
    user: {},
    currentPlaylist:{},
    currentSong: {},
    userPlaylists: []
  }
  //allows the user to stay logged in
  // if user? take the token from localStorage and send in to the backend
  // check to see if there is a user
  // if there is a user fetch to current_user
  //add the key Authorization that is recieving the token
  //change this.props.history.push("/albums") to the user view page when finished with albums

  componentDidMount = () => {
    let token = localStorage.token
    token
     ? fetch("http://localhost:3000/api/v1/current_user",{
        method: "GET",
        headers: {
          "content-type": "application/json",
          accepts: "application/json",
          Authorization: `Bearer ${token}`
        }
      })
      .then( resp => resp.json())
      .then(user => {
        this.setState({user: user }, () => {
          this.props.history.push("/webplayer")
        });
      })
    : (this.props.history.push("/login"))
  };


  handleSubmitForSignUp = (userData) => {
    console.log(userData);
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({ user: userData })
    })
    .then(resp => resp.json())
    .then(userInfo => {
      this.setState({ user: userInfo.user }, () => {
        localStorage.setItem("token", userInfo.jwt )
        this.props.history.push("/playlists")
      });
    });
  };

  handleSubmitForLogin = (userData) => {
    fetch("http://localhost:3000/api/v1/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accepts: "application/json"
        },
        body: JSON.stringify({ user: userData })
      })
      .then(resp => resp.json())
      .then(userInfo => {
          console.log(userInfo)
          localStorage.token = userInfo.jwt
          this.setState({ user: userInfo.user },
          () => this.props.history.push("/webplayer"));
      })
    }

  selectedPlaylistCard = (playlistObj) => {
    this.setState({
      currentPlaylist: playlistObj
    })
  }

  selectedTrackCard = (trackObj) => {
    this.setState({
      currentSong: trackObj
    })
  }

  addPlayistToUser = (playlist) => {
    this.setState({
      userPlaylists: [playlist, ...this.state.userPlaylists]
    })
  }
  // afterSelectPlaylistCard=()=>{
  //   const apiKey = '?apikey=MTU1YjllNjUtOTIwNi00MGJlLWJlOWMtZGYxMjJhZDI0NTk5&limit=10';
  //   debugger
  //   let href = this.state.currentPlaylist.links.tracks.href
  //   let url = ''
  //   if (!!href){
  //     url = `${href}${apiKey}`
  //   }
  //   console.log(this.state);
  //   url
  //   ? fetch(url)
  //   .then(resp => resp.json())
  //   .then(tracksData => {
  //     this.setState({
  //       trackList: tracksData.tracks
  //     })
  //   })
  //   : console.log('hi');
  // }
  //
  // selectedPlaylistCard = (playlistObj) => {
  //   this.setState({
  //     currentPlaylist: playlistObj
  //   }, console.log(this.state))
  //   this.afterSelectPlaylistCard(playlistObj)
  // }


  render() {

    //console.log('app state', this.state)

    //browser router listens for the change in route and tells the application what to do based on the route.
    return (
      <div>
        <NavBar/>
        <Switch>
          <Route path="/playlists/:name/:songname"
            render={()=> <SongDetail currentSong={this.state.currentSong}/>}/>
          <Route path="/playlists/:name"
            render={()=> <SongList currentPlaylist={this.state.currentPlaylist} trackList={this.state.trackList} selectedTrackCard={this.selectedTrackCard} user={this.state.user} addPlayistToUser={this.addPlayistToUser}/>}/>
          <Route exact path="/header"
            render={()=> <Header/> } />
          <Route exact path="/playlists"
            render={()=> <PlaylistContainer user={this.state.user} selectedPlaylistCard={this.selectedPlaylistCard}/> } />
          <Route
            exact path="/webplayerlist"
            render={() => <WebplayerList/> } />
          <Route
            exact path="/webplayer"
            render={() => <WebPlayer user={this.state.user || {}} selectedPlaylistCard={this.selectedPlaylistCard} addPlayistToUser={this.addPlayistToUser}/> } />
          <Route
            exact path="/profiles"
            render={() => <ProfileContainer/> } />
          <Route
            exact path="/signup"
            render={ () => <SignUp handleSubmitForSignUp={this.handleSubmitForSignUp}/> } />
          <Route
            exact path="/login"
            render={ () => <Login handleSubmitForLogin={this.handleSubmitForLogin}/> } />
          <Route
            path="/home"
            render={ () => <Home user={this.state.user} /> } />
          <Route
            path="/"
            component={Error} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);