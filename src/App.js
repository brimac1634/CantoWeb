import React, { Component } from 'react';
import './App.css';
import NavBar from './Components/NavBar';
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
      	<NavBar />
	    <MainView />
      </div>
    );
  }
}

export default App;
