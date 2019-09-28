import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import SongList from './SongList'
//css/sass
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../style/sass/components/_feature-box.scss';

class PlaylistCard extends React.Component{
  state = {
    clicked: false
  }

//in order to get the selected playlist I call the callback function defined in app
// which sets the state of current playlist to the selected playlist
// in app I pass that currentPlaylist to the songList
  handleClick = (event) => {
    console.log("playlist? ", this.props);
    this.props.selectedPlaylistCard(this.props.playlist)
    this.setState({
      clicked: !this.state.clicked
    })
    this.props.history.push("/playlists/:name")

  }


  // console.log('PlaylistCard', `/playlists/${this.formattedName()}`);
  // console.log(this.formattedName());
  // console.log(this.props);
  // console.log('blerg', this.props.playlist.name);
    // formattedName = () => {return this.props.playlist.name.replace(' ', '-')}


  render(){
    // console.log('PlaylistCard',this.props);
    const styles = {
      card: {
        maxWidth: 345,
      },
      media: {
        objectFit: 'cover',
      },
    };

    return(
        <Link to={`/playlists/${this.props.playlist.name}`}>
          <Card className="card" id="important" onClick={this.handleClick}>
          <CardActionArea>
            <CardMedia

              component="img"
              alt="playlist"
              className="media"
              spacing={0}
              alignItems="center"
              justify="center"
              image={this.props.playlist.images? this.props.playlist.images[0].url : null}
              title="PlaylistCard"
            />
            <CardContent className="text">
              <Typography gutterBottom variant="h5" component="h2">
                { this.props.playlist.length ? this.props.playlist[0].name : this.props.playlist.name }
              </Typography>
            </CardContent>
          </CardActionArea>
          </Card>
        </Link>
    )
  }
}

export default withRouter(PlaylistCard);
