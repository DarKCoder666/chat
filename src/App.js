import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import SignUp from './components/Auth/SignUp'
import SignIn from './components/Auth/SignIn'
import Chat from './components/Chat/Index'
import firebase, { auth } from './firebase.js'

import './scss/main.scss';
import './App.scss';

const Page404 = ({ location }) => <div>No route match for {location.pathname}</div>;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null }
    this.logOutUser = this.logOutUser.bind(this);
  }
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          user
        });
      }
    });
  }

  logOutUser = () => {
    firebase.auth().signOut()
      .then(window.location = "/");
  }

  render() {
    return (
      <div className="App container">
        <Router>
          <div className="app">
            <nav className="nav">
              {!this.state.user &&
                <div>
                  <Link className="nav-link" to="/signIn">SignIn</Link>
                  <Link className="nav-link" to="/signUp">SignUp</Link>
                </div>
              }

              {this.state.user &&
                <a className="nav-link-logout" href="#!" onClick={this.logOutUser}>Logout</a>
              }
            </nav>

            <Switch>
              <Route path="/" exact render={() => <Chat user={this.state.user}/>} />
              <Route path="/signIn" exact component={SignIn} />
              <Route path="/signUp" exact component={SignUp} />
              <Route component={Page404} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
