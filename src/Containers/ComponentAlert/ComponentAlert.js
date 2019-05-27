import React, { Component } from 'react'
import './ComponentAlert.css';
import ReactDOM, { render, unmountComponentAtNode } from 'react-dom'
import Icon from '../../Components/Icon/Icon';

const componentAlert = (WrappedComponent) => {
  class ComponentAlert extends Component {
    constructor(props) {
      super(props);
      this.state = {
        width: '',
      }
      this.content = React.createRef();
      this.close = this.close.bind(this);
    }

    componentDidMount() {
      if (this.content.current.firstChild) {
        const rect = this.content.current.firstChild.getBoundingClientRect();
        this.setState({
          width: rect.width + 20,
        })
      }
    }
    
    close = (event) => {
      event.stopPropagation()
      removeBodyClass()
      removeComponentAlert()
    }

    stopBubble = (event) => {
      event.stopPropagation();
    }

    render () {
      let { width } = this.state;
      return (
        ReactDOM.createPortal(
          <div
            className='component-overlay'
            ref={dom => (this.overlay = dom)}
            onClick={this.close}
          >
            <div className='component-alert'>
              <div 
                className='component-alert-body'
                style={{maxWidth: `${width}px`}}
                onClick={this.stopBubble}
              >
                <button 
                  ref={this.closeButton} 
                  className='close' 
                  onClick={this.close}
                  onTouchEnd={this.close}
                >
                  <Icon 
                    icon='multiply' 
                    iconStyle='dark' 
                    width='13'
                  />
                </button>
                <div className='inner-container' ref={this.content}>
                  <WrappedComponent 
                    handleClose={this.close}
                    {...this.props}
                  />
                </div>
              </div>
            </div>
          </div>
        , document.body
      ))
    }
  }
  return ComponentAlert;
}

function createComponentAlert (component) {
  let divTarget = document.getElementById('component-alert')
  const AlertWithComponent = componentAlert(component);
  if (divTarget) {
    render(<AlertWithComponent />, divTarget)
  } else {
    divTarget = document.createElement('div')
    divTarget.id = 'component-alert'
    document.body.appendChild(divTarget)
    render(<AlertWithComponent />, divTarget)
  }
}

function removeComponentAlert () {
  const target = document.getElementById('component-alert')
  unmountComponentAtNode(target)
  target.parentNode.removeChild(target)
}

function addBodyClass () {
  document.body.classList.add('component-alert-body-element')
}

function removeBodyClass () {
  document.body.classList.remove('component-alert-body-element')
}

export function renderComponentAlert (component) {
  addBodyClass()
  createComponentAlert(component)
}
