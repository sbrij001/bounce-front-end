import React from 'react'
import { withRouter } from 'react-router-dom';

class Login extends React.Component{
  state = {
    email: "",
    password: ""
  }

// Logout
//Onclick = { () => {
// localStorage.removeItem("token");
// this.props.history.push("signup");
// }}

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmitForLogin = (event) => {
    event.preventDefault();
    this.props.handleSubmitForLogin(this.state);
    this.setState({
      email: "",
      password: ""
    });
  };

  render(){
    // console.log(this.props);
    return(
      <div>
      <h1>Log In</h1>
      <form onSubmit={this.handleSubmitForLogin}>
        <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.changeHandler}/>
        <input type="text" placeholder="Password" name="password" value={this.state.password} onChange={this.changeHandler}/>
        <button>Log In</button>
      </form>
      </div>
    )
  }
}
export default withRouter(Login);
