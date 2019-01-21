import React, { Component } from 'react';
import './App.css';
import TitleBar from './Components/TitleBar/TitleBar';
import NavBar from './Components/NavBar/NavBar';
import MainView from './Containers/MainView';
import SignIn from './Components/SignIn/SignIn';

class App extends Component {

constructor (props, context) {
	super();
  this.handleNavChange = this.handleNavChange.bind(this);
	this.state = {
		current: 'Search',
    loginRoute: '',
	}
}
  handleNavChange = (title) => {
    this.setState({
      current: title,
    })
  }

  handleSignInView = (type) => {
    console.log(type);
    this.setState({
      loginRoute: type,
    })
  }

  renderLoginOptions = (loginRoute) => {
    if (loginRoute === 'login') {
      return (
        <SignIn 
            className='sign-in' 
            signInToggle={this.handleSignInView}
            title='Login'
            signInButton='Sign In'
            alternateButton='register'
          />
      );
    } else if (loginRoute === 'register') {
      return (
        <SignIn 
            className='Register' 
            signInToggle={this.handleSignInView}
            title='Register'
            signInButton='Register'
            alternateButton='login'
          />
      );
    }
  }

  render() {
    const { current, loginRoute } = this.state;
    return (
      <div>
        {this.renderLoginOptions(loginRoute)}
        <TitleBar 
          className='title-bar' 
          current={current}  
          signInToggle={this.handleSignInView}
        />
      	<NavBar 
          className='nav-bar' 
          current={this.state.current} 
          navChange={this.handleNavChange}
        />
  	    <MainView className='main-view'/>
      </div>
    );
  }
}

export default App;
