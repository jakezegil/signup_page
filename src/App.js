import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignupPage from './pages/Signup';
import LoginPage from './pages/Login';
import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import config from './firebaseConfig.js';
import './App.css';


const firebaseApp = firebase.initializeApp(config);

class App extends Component {

  constructor() {
    super();

    this.state = {
      user: '',
      logout: false
    }

    this.logOut = this.logOut.bind(this);
  }

  logOut = e => {
    e.preventDefault();

    this.setState({
      user: null });

    firebase.auth().signOut();
  }

  signedIn = e => {
    firebase.auth().onAuthStateChanged(newUser => {this.setState({user: newUser})});
  }

  render() {

    return (
      <Router basename="/react-auth-ui/">
        <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form">
            <div className="PageSwitcher">
                {this.state.user ? <div className = 'PageSwitcher__Item'>{this.state.user.email}You signed in!</div> :
                   (<><NavLink to="/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                   <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink></>)}
              
              </div>

              <div className="FormTitle">
                  <NavLink to="/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink>
                   <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
              </div>

              <Route exact path="/" render={(props) => <SignupPage {...props} signedIn={this.signedIn}/>}>
              </Route>
              <Route path="/sign-in" render={(props) => <LoginPage {...props} signedIn={this.signedIn}/>}>
                
              </Route>
          </div>
        </div>
      </Router>
    );
  }
}

const firebaseAppAuth = firebaseApp.auth();

export default withFirebaseAuth({
  firebaseAppAuth
})(App);