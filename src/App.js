import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar/NavBar';
import MainView from './Containers/MainView';

class App extends Component {

constructor (props, context) {
	super(props, context);
	this.state = {
		
	}
}

  render() {
    return (
      <div>
      	<NavBar className='nav-bar'/>
  	    <MainView className='main-view'/>
      </div>
    );
  }
}

export default App;
