import React, { Component } from 'react';

import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { SwapSpinner } from "react-spinners-kit";
import Logo from './components/logo/logo.component';
import TitleBar from './components/title-bar/title-bar.component';
import MainView from './components/main-view/main-view.component';
import PopUpAlert from './components/pop-up-alert/pop-up-alert.component';
import { setUser } from './redux/sign-in/sign-in.actions';
import apiRequest from './helpers/apiRequestUtil';
import { routes } from './redux/routing/routing.constants';
import { deleteToken } from './helpers/helpers';

import './App.scss';

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateURL: (path) => dispatch(push(path)),
    updateUser: (user) => dispatch(setUser(user)),
  }
}

class App extends Component {
  constructor (props) {
  	super();
    this.state = {
      loadingHasFinished: false,
      initialLoading: true
    }
  }  

  componentDidMount() {
    const { updateURL, updateUser } = this.props;
    const { LOGIN } = routes;
    const cookies = new Cookies();
    const token = cookies.get('authToken')
    if (token) {
      apiRequest({
        endPoint: '/',
        method: 'GET',
      })
      .then(user => {
        if (user && user.error) {
          deleteToken()
          updateURL(LOGIN)
        } else {
          updateUser(user);
        }
        this.completeLoading()
      })
      .catch(()=>{
        this.completeLoading()
      })
    } else {
      this.completeLoading()
    }
  }

  completeLoading = () => {
    this.setState({
      loadingHasFinished: true,
      initialLoading: false
    })
  }

  render() {
    const { loading } = this.props;
    const { loadingHasFinished, initialLoading } = this.state;
    return (
      <div className='app'>
        {
          loadingHasFinished &&
            <span>
              <MainView />
              <TitleBar />
              <PopUpAlert 
                title={alert.title} 
                message={alert.message} 
                showAlert={alert.showAlert}
              />
            </span>
        }
        {
          initialLoading &&
            <div className='loader vertical'>
              <Logo iconSize='100px' margin='20px'/>
              <SwapSpinner
                size={60}
                color='#ff7a8a'
                loading={initialLoading}
              />
            </div>
        }
        {
          loading &&
            <div className='loader'>
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
