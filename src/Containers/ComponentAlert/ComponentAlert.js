import React, { Component } from 'react'
import './ComponentAlert.css';
import ReactDOM, { render, unmountComponentAtNode } from 'react-dom'
import Icon from '../../Components/Icon/Icon';

const componentAlert = (WrappedComponent) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        width: '',
        height: '',
        animateOut: false,
      }
      this.content = React.createRef();
    }

    componentDidMount() {
      if (this.content.current.firstChild) {
        const rect = this.content.current.firstChild.getBoundingClientRect();
        this.setState({
          width: rect.width,
          height: rect.height,
        })
      }
    }

    close = () => {
      removeBodyClass()
      removeComponentAlert()
    }

    handleAnimateOut = () => {
      this.setState({
          animateOut: true,
        })
      setTimeout(() => {
        this.setState({
          animateOut: false,
        })
        this.close()
      }, 5000)
    }

    render () {
      const { width, height, animateOut } = this.state;

      const fadeType = animateOut ? 'alert-fade-out' : 'alert-fade-in';

      return (
        ReactDOM.createPortal(
          <div
            className={`component-overlay ${fadeType}`}
            ref={dom => (this.overlay = dom)}
          >
            <div className='component-alert'>
              <div 
                className='component-alert-body'
                style={{width: `${width}px`, height: `${height}px`}}
              >
                <button className='close' onClick={this.handleAnimateOut}>
                  <Icon 
                    icon='multiply' 
                    iconStyle='dark' 
                    width='15'
                  />
                </button>
                <div ref={this.content}>
                  <WrappedComponent 
                    handleClose={this.handleAnimateOut}
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
