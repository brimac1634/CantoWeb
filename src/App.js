import React, { Component } from 'react';
import './App.css';
import MediaQuery from 'react-responsive';
import TitleBar from './Components/TitleBar/TitleBar';
import NavBar from './Components/NavBar/NavBar';
import MainView from './Containers/MainView';

class App extends Component {
  constructor (props) {
  	super();
  	this.state = {
  		current: 'Search',
      userID: '',
      userEmail: '',
  	}
  }  

  componentDidMount() {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      const user = JSON.parse(cachedUser)
      this.setState({userID: user.id, userEmail: user.email})
    }
  }

  handleNavChange = (title) => this.setState({ current: title })

  updateUser = (user) => {
    const { id, email } = user;
    localStorage.setItem('user', JSON.stringify(user));
    this.setState({
      userID: id,
      userEmail: email
    })
  }

  render() {
    const { 
      current,
      userID,
      userEmail
    } = this.state;

    return (
      <div>
        <TitleBar 
          className='title-bar' 
          userEmail={userEmail}
          current={current}
          updateUser={this.updateUser}
          navChange={this.handleNavChange}
        />
        <MediaQuery minWidth={950}>
          <NavBar 
            className='nav-bar' 
            current={this.state.current} 
            navChange={this.handleNavChange}
          />
        </MediaQuery>
  	    <MainView className='main-view' userID={userID}/>
      </div>
    );
  }
}

export default App;
