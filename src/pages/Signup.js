import React, { Component } from 'react';
import data from '../data.json';
import FormError from '../FormError';
import * as firebase from 'firebase/app';




class SignupPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            validEmail: false,
            username: '',
            validUsername: false,
            password: '',
            verifypassword: '',
            hasAgreed: false,
            errorMessage: null
        };

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleInput(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
          [name]: value
        }, () => this.state.password != this.state.verifypassword ? 
        this.setState({errorMessage: 'passwords don\'t match'}): 
        this.setState({errorMessage: null}));
    }

    handleSubmit(e) {
        e.preventDefault();
        let name = this.state.name;
        let username = this.state.username;
        let email = this.state.email;
        let password = this.state.password;
        let verifypassword = this.state.verifypassword;
        
 
        if(!this.state.errorMessage){
            firebase
             .auth()
              .createUserWithEmailAndPassword(
              email,
                password
            ).then(this.props.signedIn("billy")).catch(error => {
                this.state.errorMessage !== null ? 
                this.setState({errorMessage: error.message}) :
                this.setState({errorMessage: null})
            })
        }
        
    
    }

    handleClick(e) {
        let target = e.target;
        let value = target.checked;
        let name = target.name;

        this.setState({
            [name]: value
        })
    }

    
    render() {
        return (
        <div className="FormCenter">
            {this.state.errorMessage !== null ? (<FormError theMessage={this.state.errorMessage}/>) 
              : null}
            <form onSubmit={this.handleSubmit} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Full Name</label>
                <input type="text" id="name" required className="FormField__Input" placeholder="Enter your full name" name="name" value={this.state.name} onChange={this.handleInput} />
              </div>
               <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" required className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={this.handleInput} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="username">Username</label>
                <input type="username" id="username" required className="FormField__Input" placeholder="Enter your username" name="username" value={this.state.username} onChange={this.handleInput} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" required className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={this.handleInput} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="verifypassword">Verify Password</label>
                <input type="password" id="verifypassword" required className="FormField__Input" placeholder="Enter your password again" name="verifypassword" value={this.state.verifypassword} onChange={this.handleInput} />
              </div>
              <div className="FormField">
                <label className="FormField__CheckboxLabel">
                    <input className="FormField__Checkbox" required type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onClick={this.handleClick} /> I agree to the <a className="FormField__TermsLink">terms of service</a>
                </label>
              </div>

              <div className="FormField">
                  <button id ="submit" className="FormField__Button">Sign Up</button>
              </div>
            </form>
          </div>
        );
    }
}
export default SignupPage;