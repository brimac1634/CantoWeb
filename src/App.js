import React, { Component } from 'react';
import './App.css';
import TitleBar from './Components/TitleBar/TitleBar';
import NavBar from './Components/NavBar/NavBar';
import MainView from './Containers/MainView';

class App extends Component {

constructor (props, context) {
	super();
  this.handleNavChange = this.handleNavChange.bind(this);
	this.state = {
		current: 'Search'
	}
}
  handleNavChange = (title) => {
    this.setState({
      current: title,
    })
  }

  render() {
    return (
      <div>
        <TitleBar className='title-bar' current={this.state.current}/>
      	<NavBar className='nav-bar' current={this.state.current} navChange={this.handleNavChange}/>
  	    <MainView className='main-view'/>
      </div>
    );
  }
}

export default App;
