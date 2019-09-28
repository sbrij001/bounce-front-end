import React from 'react'
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'

//scss
import '../style/sass/components/login.scss';

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
      <div className="triangle first"></div>
      <div className="triangle second"></div>
      <svg width='0' height='0'>
      <defs>
      <clipPath id="cp" clipPathUnits="objectBoundingBox">
      <path d="M0.500, 0.945 L0.994, 0.090 L0.006, 0.090 L0.500, 0.945 L0.500, 0.650 L0.262, 0.238 L0.738, 0.237 L0.500, 0.650z"></path>
      </clipPath>
      </defs>
      </svg>

      <div className="login">
      <Form
        size={'massive'}
        key="{'massive'}"
        onSubmit={this.handleSubmitForLogin}
      >
        <Form.Field>
          <label id='label'>Email</label>
          <div class="ui input focus">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={this.state.email}
            onChange={this.changeHandler}
          />
          </div>
        </Form.Field>
        <Form.Field>
          <label id='label'> Password</label>
          <div class="ui input focus">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.password}
            onChange={this.changeHandler}
          />
          </div>
        </Form.Field>
        <button
          id="btn"
          className="ui teal basic button"
          type="submit"
          >
          Log In
        </button>
      </Form>
      </div>
      </div>
    )
  }
}
export default withRouter(Login);
