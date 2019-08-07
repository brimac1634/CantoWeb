import React, { Component } from 'react';


import './App.scss';



class App extends Component {
  constructor (props) {
  	super();
    this.state = {
      loadingHasFinished: false,
      initialLoading: true
    }
  }  


  render() {
    return (
      <div className='app'>
        hi
      </div>
    );
  }
}

export default App;
