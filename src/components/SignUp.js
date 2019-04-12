import React from 'react'
import { withRouter } from 'react-router-dom';

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
      <div>
      <h1>Sign Up For Bloc</h1>
      <form onSubmit={this.handleSubmitForSignUp}>
        <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.changeHandler}/>
        <input type="text" placeholder="Email" name="email" value={this.state.email} onChange={this.changeHandler}/>
        <input type="text" placeholder="Password" name="password" value={this.state.password} onChange={this.changeHandler}/>
        <input type="text" placeholder="Birthday" name="birthday" value={this.state.birthday} onChange={this.changeHandler}/>
        <button>Sign Up</button>
      </form>
      </div>
    )
  }
}
export default withRouter(SignUp);
