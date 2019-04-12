import React from 'react';
import { API_ROOT, HEADERS } from '../constants'

class NewWebplayerForm extends React.Component {
  state = {
    title: ''
  }

  handleChange = e => {
    this.setState({ title: e.target.value })
  };

  handleSubmit = e => {
    e.preventDefault()
    fetch(`${API_ROOT}/webplayers`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        title: this.state.title 
      })
    });
    this.setState({ title: '' })
  }

  render = () => {
    return(
      <div className="newWebplayerForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Conversation:</label>
          <br />
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}
export default NewWebplayerForm
