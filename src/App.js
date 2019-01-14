import React, { Component } from 'react';
import './App.css';
import TitleBar from './Components/TitleBar/TitleBar';
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
        <TitleBar className='title-bar'/>
      	<NavBar className='nav-bar'/>
  	    <MainView className='main-view'/>
      </div>
    );
  }
}

export default App;
