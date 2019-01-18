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
    signInShowing: false,
	}
}
  handleNavChange = (title) => {
    this.setState({
      current: title,
    })
  }

  handleShowSignIn = () => {
    this.setState({
      signInShowing: !this.state.signInShowing,
    })
  }

  render() {
    const { current, signInShowing } = this.state;
    return (
      <div>
        {signInShowing === true &&
          <SignIn />
        }
        <TitleBar className='title-bar' current={current} signInShowing={signInShowing} showSignIn={this.handleShowSignIn}/>
      	<NavBar className='nav-bar' current={this.state.current} navChange={this.handleNavChange}/>
  	    <MainView className='main-view'/>
      </div>
    );
  }
}

export default App;
