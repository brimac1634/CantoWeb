import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import TitleBar from './Components/TitleBar/TitleBar';
import MainView from './Containers/MainView/MainView';
import PopUpAlert from './Components/PopUpAlert/PopUpAlert';
import { setUser } from './Containers/SignIn/actions';
import { SwapSpinner } from "react-spinners-kit";

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
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
    const { loading } = this.props;
    return (
      <div className='app'>
        <TitleBar 
          className='title-bar'
        />
        <MainView className='main-view' />
        <PopUpAlert 
          title={alert.title} 
          message={alert.message} 
          showAlert={alert.showAlert}
        />
        {
          loading &&
            <div className='center-div'>
              <SwapSpinner
                size={60}
                color='#ff7a8a'
                loading={loading}
              />
            </div>
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
