import React, { Component } from 'react';
import './App.css';
import TitleBar from './Components/TitleBar/TitleBar';
import NavBar from './Components/NavBar/NavBar';
import MainView from './Containers/MainView';
import PopUp from './Components/PopUp/PopUp';
import SignIn from './Components/SignIn/SignIn';

class App extends Component {

  constructor (props, context) {
  	super();
  	this.state = {
  		current: 'Search',
      loginRoute: '',
      showPopUP: true,
      userID: '',
      userEmail: '',
  	}
  }

  handleNavChange = (title) => this.setState({ current: title });

  handleSignInView = (type) => {
    this.setState({ 
      loginRoute: type,
      showPopUp: true, 
    })

  }
  handlePopUpView = () => this.setState({ showPopUp: false})

  updateUserID = (user) => {
    const { id, email } = user;
    this.setState({
      userID: id,
      userEmail: email
    })

  }
  

  renderLoginOptions = (loginRoute) => {
    const { showPopUp } = this.state;
    if (loginRoute === 'login') {
      return (
        <PopUp 
          popUpToggle={this.handleSignInView} 
          handlePopUpView={this.handlePopUpView} 
          showPopUp={showPopUp}
        >
          <SignIn 
              className='sign-in' 
              signInToggle={this.handleSignInView}
              title='Login'
              signInButton='Sign In'
              alternateButton='register'
              show='animate-fade-in'
              updateUserID={this.updateUserID}
              handlePopUpView={this.handlePopUpView}
            />
        </PopUp>
      );
    } else if (loginRoute === 'register') {
      return (
        <PopUp 
          popUpToggle={this.handleSignInView}
          handlePopUpView={this.handlePopUpView}  
          showPopUp={showPopUp}
        >
          <SignIn 
            className='Register' 
            signInToggle={this.handleSignInView}
            title='Register'
            signInButton='Register'
            alternateButton='login'
            show='animate-fade-in'
            updateUserID={this.updateUserID}
            handlePopUpView={this.handlePopUpView}
          />
        </PopUp>
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
