import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import TitleBar from './Components/TitleBar/TitleBar';
import MainView from './Containers/MainView/MainView';
import PopUpAlert from './Components/PopUpAlert/PopUpAlert';
import { setUser } from './Containers/SignIn/actions';
import { SwapSpinner } from "react-spinners-kit";
import { setupPlayBack, audioRequest } from './Helpers/audioRequest';
// import { isIOS } from "react-device-detect";

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
    // this.unlockSound()
  }

  // unlockSound = () => {
  //   audioRequest(2)
  //       .then(({context, arrayBuffer}) => {
  //         context.decodeAudioData(arrayBuffer, decodedAudio => {
  //             const playSound = setupPlayBack(context, decodedAudio)
  //             console.log(playSound)

  //             const unlock = function() {
  //               console.log(playSound)
  //               playSound.start(0);
  //               document.body.removeEventListener('touchstart', unlock);
  //               document.body.removeEventListener('touchend', unlock);
  //             };

  //             document.body.addEventListener('touchstart', unlock, false);
  //             document.body.addEventListener('touchend', unlock, false);
  //         }, () => {
  //           console.log('failed to load audio')
  //         })
  //       })
  //       .catch(()=>{
  //         console.log('failed to request audio')
  //       })
  // }

  render() {
    const { loading } = this.props;
    return (
      <div className='app'>
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
