import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import TitleBar from './Components/TitleBar/TitleBar';
import NavBar from './Containers/NavBar/NavBar';
import MainView from './Containers/MainView';
import PopUpAlert from './Components/PopUpAlert/PopUpAlert';
import { setUser } from './actions';

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(setUser(user))
  }
}

class App extends Component {
  constructor (props) {
  	super();
  	this.state = {
  		current: 'Search',
      alert: {
        title: '',
        message: '',
        showAlert: true,
      }
  	}
  }  

  componentDidMount() {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      const { updateUser } = this.props;
      const user = JSON.parse(cachedUser)
      updateUser(user);
    }
  }

  handleNavChange = (title) => this.setState({ current: title })

  presentAlert = (title, message) => {
    this.setState({
      alert: {
        title: title,
        message: message,
        showAlert: true,
      }
    })
    setTimeout(() => {
      this.setState({alert: {showAlert: false}})
    }, 3000)
  }

  render() {
    const { 
      current,
      alert,
    } = this.state;

    return (
      <div>
        <TitleBar 
          className='title-bar'
          current={current}
          navChange={this.handleNavChange}
        />
        <MediaQuery minWidth={950}>
          <NavBar 
            className='nav-bar' 
            current={this.state.current} 
            navChange={this.handleNavChange}
          />
        </MediaQuery>
  	    <MainView className='main-view' />
        <PopUpAlert 
          title={alert.title} 
          message={alert.message} 
          showAlert={alert.showAlert}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(App);
