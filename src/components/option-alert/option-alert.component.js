import React, { Component } from 'react'
import './option-alert.styles.css';
import { render, unmountComponentAtNode } from 'react-dom'
import Button from '../button/button.component';

export default class OptionAlert extends Component {
  static defaultProps = {
    buttons: [
      {
        label: 'Okay',
        onClick: () => null
      },
    ],
    willUnmount: () => null,
    onClickOutside: () => null,
    onKeypressEscape: () => null
  }

  handleClickButton = button => {
    if (button.onClick) button.onClick()
    this.close()
  }

  handleClickOverlay = (event) => {
    const { onClickOutside } = this.props
    if (event.target === this.overlay) {
      onClickOutside()
      this.close()
    }
  }

  close = () => {
    removeBodyClass()
    removeOptionAlert()
  }

  keyboardClose = event => {
    const { onKeypressEscape } = this.props
    if (event.keyCode === 27) {
      onKeypressEscape(event)
      this.close()
    }
  }

  componentDidMount = () => {
    document.addEventListener('keydown', this.keyboardClose, false)
  }

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.keyboardClose, false)
    this.props.willUnmount()
  }

  render () {
    const { title, message, buttons } = this.props

    return (
      <div
        className='alert-overlay'
        ref={dom => (this.overlay = dom)}
        onClick={this.handleClickOverlay}
      >
        <div className='option-alert'>
          <div className='option-alert-body'>
            {title && <h2>{title}</h2>}
            {message}
            <div className='option-alert-button-group'>
              {buttons.map((button, i) => (
                <Button
                  key={i}
                  title={button.label}
                  buttonType='ghost'
                  width='80px'
                  handleClick={() => this.handleClickButton(button)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}


function createOptionAlert (properties) {
  let divTarget = document.getElementById('option-alert')
  if (divTarget) {
    render(<OptionAlert {...properties} />, divTarget)
  } else {
    divTarget = document.createElement('div')
    divTarget.id = 'option-alert'
    document.body.appendChild(divTarget)
    render(<OptionAlert {...properties} />, divTarget)
  }
}

function removeOptionAlert () {
  const target = document.getElementById('option-alert')
  unmountComponentAtNode(target)
  target.parentNode.removeChild(target)
}

function addBodyClass () {
  document.body.classList.add('option-alert-body-element')
}

function removeBodyClass () {
  document.body.classList.remove('option-alert-body-element')
}

export function optionAlert (properties) {
  addBodyClass()
  createOptionAlert(properties)
}
