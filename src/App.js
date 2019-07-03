import React, { Component } from 'react';
import './App.css';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import TitleBar from './Components/TitleBar/TitleBar';
import MainView from './Containers/MainView/MainView';
import PopUpAlert from './Components/PopUpAlert/PopUpAlert';
import { setUser } from './Containers/SignIn/actions';
import { SwapSpinner } from "react-spinners-kit";
import apiRequest from './Helpers/apiRequest';
import { routes } from './Routing/constants';

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
      loadingHasFinished: false
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
          updateURL(LOGIN)
        } else {
          updateUser(user);
        }
        this.setState({loadingHasFinished: true})
      })
      .catch(()=>this.setState({loadingHasFinished: true}))
    }
  }

  render() {
    const { loading } = this.props;
    const { loadingHasFinished } = this.state;
    return (
      <div className='app'>
        {
          loadingHasFinished &&
            <span>
              <TitleBar 
                className='title-bar'
              />
              <div className='main-view-container'>
                <MainView className='main-view' />
              </div>
              <PopUpAlert 
                title={alert.title} 
                message={alert.message} 
                showAlert={alert.showAlert}
              />
            </span>
        }
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
