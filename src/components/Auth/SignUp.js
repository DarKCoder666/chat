import React, { Component } from 'react';
import firebase from '../../firebase.js'
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';

import './Auth.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      error: null
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, username, password } = this.state;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        const user = firebase.auth().currentUser;
        user
          .updateProfile({ displayName: username })
          .then(() => {
            this.props.history.push('/');
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const { email, username, password, error } = this.state;
    return (
      <div className="auth--container">
        <h1>Register your account</h1>
        {this.error && <p className="error-message">{error.message}</p>}
        <form onSubmit={this.handleSubmit}>
          <Input.Group compact>
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={this.handleChange}
            />
          </Input.Group>
          <br/>
          <Input.Group compact>
            <label htmlFor="email">Email address</label>
            <Input
              type="text"
              name="email"
              id="email"
              value={email}
              onChange={this.handleChange}
            />
          </Input.Group>
          <br/>
          <Input.Group compact>
            <label htmlFor="email">Choose a password</label>
            <Input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={this.handleChange}
            />
          </Input.Group>
          <br/>

          <Button htmlType="submit">Sign Up</Button>

          <p>Already have an account? <Link className="login-btn" to="/signin">Login here</Link></p>
        </form>
      </div>
    );
  }
}

export default SignUp;