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
        height: '',
        animateOut: false,
      }
      this.content = React.createRef();
    }

    componentDidMount() {
        if (this.content.current.firstChild) {
          const rect = this.content.current.getBoundingClientRect();
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
      }, 800)
    }

    render () {
      const { width, height, animateOut } = this.state;
      const { WrappedComponent } = this.props;

      const fadeType = animateOut ? 'animate-fade-out' : 'animate-fade-in';

      return (
        ReactDOM.createPortal(
          <div
            className='component-overlay'
            ref={dom => (this.overlay = dom)}
            onClick={this.handleClickOverlay}
          >
            <div className='component-alert'>
              <div 
                className={`component-alert-body ${fadeType}`}
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
        )
      )
    }
  }
  return ComponentAlert;
}
export default componentAlert;


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
