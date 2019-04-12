import React from 'react';
import { API_ROOT, HEADERS } from '../constants';

class NewSongsForm extends React.Component {
  state = {
    song: '',
    webplayer_id: this.props.webplayer_id
  };

  componentWillRecieveProps =  nextProps => {
    this.setState({ webplayer_id: nextProps.webplayer_id })
  };

  handleChange = e => {
    this.setState({ song: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault();
    let token = localStorage.token
    fetch(`${API_ROOT}/songs`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
    this.setState({ song: '' })
  };

  render = () => {
    return(
      <div className="newSongForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Song:</label>
          <br />
          <input
            type="text"
            value={this.state.song}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default NewSongsForm;
