import React, { Component } from 'react';
import './App.css';
import TitleBar from './Components/TitleBar/TitleBar';
import NavBar from './Components/NavBar/NavBar';
import MainView from './Containers/MainView';
import PopUp from './Components/PopUp/PopUp';
import PopOver from './Components/PopOver/PopOver';
import SignIn from './Components/SignIn/SignIn';

class App extends Component {

  constructor (props) {
  	super();
  	this.state = {
  		current: 'Search',
      showPopUP: false,
      animateOut: false,
      showPopOver: false,
      popOverType: '',
      popOverPoint: {
        x: '',
        y: '',
      },
      triggerWidth: '',
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
  togglePopOver = (popOverType, point, triggerWidth) => {
    this.setState({
     showPopOver: !this.state.showPopOver,
     popOverType: popOverType,
     popOverPoint: {
      x: point.x,
      y: point.y
     },
     triggerWidth: triggerWidth
   })
  }

  updateUserID = (user) => {
    const { id, email } = user;
    console.log(id);
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

  renderPopUp = (showPopOver, type, point, triggerWidth) => {
    if (showPopOver){
      if (type === 'profile') {
        return (
          <PopOver 
            arrowLocation='top'
            width='250px'
            height='300px'
            x={point.x}
            y={point.y}
            triggerWidth={triggerWidth}
          >
          <p>profiel</p>
          </PopOver>
        );
      } else if (type === 'settings') {
        return (
          <PopOver 
            arrowLocation='top'
            width='250'
            height='300'
            x={point.x}
            y={point.y}
            triggerWidth={triggerWidth}
          >
          <p>settings</p>
          </PopOver>
        );
      }
    }
    
  }

  render() {
    const { 
      current,
      loginRoute,
      userID,
      userEmail,
      showPopOver,
      popOverType,
      popOverPoint,
      triggerWidth} = this.state;

    return (
      <div>
        {this.renderLoginOptions(loginRoute)}
        {this.renderPopUp(showPopOver, popOverType, popOverPoint, triggerWidth)}
        <TitleBar 
          className='title-bar' 
          userEmail={userEmail}
          current={current}  
          signInToggle={this.presentPopUp}
          togglePopOver={this.togglePopOver}
        />
      	<NavBar 
          className='nav-bar' 
          current={this.state.current} 
          navChange={this.handleNavChange}
        />
  	    <MainView className='main-view' userID={userID}/>
      </div>
    );
  }
}

export default App;
