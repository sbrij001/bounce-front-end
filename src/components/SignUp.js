import React from 'react'
import { withRouter } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react';
import '../style/sass/components/signup.scss';

class SignUp extends React.Component{
  state = {
    email: "",
    password: ""
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmitForSignUp = (event) => {
    // console.log("state", this.state)
    event.preventDefault();
    this.props.handleSubmitForSignUp(this.state);
    this.setState({
      name: "",
      email: "",
      password: "",
      birthday: ""
    });
  };

  render(){
    //console.log(this.props);
    return(
      <div className="signup">
      <div className="square first"></div>
      <div className="square second"></div>

      <svg width='0' height='0'>
      <defs>
      <clipPath id="cp" clipPathUnits="objectBoundingBox">
      <path d="M0.500, 0.945 L0.994, 0.090 L0.006, 0.090 L0.500, 0.945 L0.500, 0.650 L0.262, 0.238 L0.738, 0.237 L0.500, 0.650z"></path>
      </clipPath>
      </defs>
      </svg>

      <Form size={'huge'} key="{'huge'}" onSubmit={this.handleSubmitForLogin}>
        <Form.Field>
          <label>Name</label>
          <div class="ui input focus">
          <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.changeHandler}/>
          </div>
        </Form.Field>

        <Form.Field>
        <label>Email</label>
        <div class="ui input focus">
        <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.changeHandler}/>
        </div>
        </Form.Field>

        <Form.Field>
        <label>Password</label>
        <div class="ui input focus">
        <input type="text" placeholder="Password" name="password" value={this.state.password} onChange={this.changeHandler}/>
        </div>
        </Form.Field>

        <Form.Field>
        <label>Birthday</label>
        <div class="ui input focus">
        <input type="text" placeholder="Birthday" name="birthday" value={this.state.birthday} onChange={this.changeHandler}/>
        </div>
        </Form.Field>

        <button  id="btn" className="ui teal basic button" type="submit">Sign Up</button>
        </Form>
      </div>
    )
  }
}
export default withRouter(SignUp);
