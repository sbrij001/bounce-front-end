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
      body: JSON.stringify(this.state)
    });
    this.setState({ title: '' })
  }

  render = () => {
    return(
      <div className="newWebplayerForm">
        
      </div>
    );
  };
}
export default NewWebplayerForm
