import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import TitleBar from './Components/TitleBar/TitleBar';
import NavBar from './Containers/NavBar/NavBar';
import MainView from './Containers/MainView/MainView';
import SignIn from './Containers/SignIn/SignIn';
import PopUpAlert from './Components/PopUpAlert/PopUpAlert';
import { setUser } from './Containers/SignIn/actions';

const mapStateToProps = state => {
  return {
    pathName: state.router.location.pathname,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (user) => dispatch(setUser(user)),
  }
}

class App extends Component {
  constructor (props) {
  	super();
  }  

  componentDidMount() {
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      const { updateUser } = this.props;
      const user = JSON.parse(cachedUser)
      updateUser(user);
    }
  }

  

  render() {
    return (
      <div>
        <TitleBar 
          className='title-bar'
        />
        <Switch>
          <Route 
            path='/signin' 
            render={()=>(
              <div className='login-background'>
                <SignIn />
              </div>
            )}
          />
          <Route 
            path='/' 
            render={()=>(
              <div>
                <MediaQuery minWidth={950}>
                  <NavBar 
                    className='nav-bar' 
                  />
                </MediaQuery>
                <MainView className='main-view' />
              </div>
            )} 
          />
        </Switch>
        <PopUpAlert 
          title={alert.title} 
          message={alert.message} 
          showAlert={alert.showAlert}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
