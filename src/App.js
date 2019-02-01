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
      showPopUP: false,
      animateOut: false,
      userID: '',
      userEmail: '',
  	}
  }

  handleNavChange = (title) => this.setState({ current: title });
  presentPopUp = () => this.setState({ showPopUp: true })
  removePopUpBegin = () => this.setState({ animateOut: true})
  removePopUpEnd = () => {
    this.setState({ 
      showPopUp: false,
      animateOut: false, 
    })
  }

  updateUserID = (user) => {
    const { id, email } = user;
    this.setState({
      userID: id,
      userEmail: email
    })

  }
  

  renderLoginOptions = () => {
    const { showPopUp, animateOut } = this.state;
    if (showPopUp) {
      return (
        <PopUp 
          removePopUpEnd={this.removePopUpEnd} 
          removePopUpBegin={this.removePopUpBegin} 
          animateOut={animateOut}
        >
          <SignIn 
              className='sign-in'
              updateUserID={this.updateUserID}
              removePopUpBegin={this.removePopUpBegin}
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
          signInToggle={this.presentPopUp}
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
