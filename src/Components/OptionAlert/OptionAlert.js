import React, { Component } from 'react'
import './OptionAlert.css';
import { render, unmountComponentAtNode } from 'react-dom'

export default class OptionAlert extends Component {
  static defaultProps = {
    buttons: [
      {
        label: 'Cancel',
        onClick: () => null
      },
      {
        label: 'Confirm',
        onClick: () => null
      }
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
    removeElementReconfirm()
    removeSVGBlurReconfirm()
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
            {title && <h1>{title}</h1>}
            {message}
            <div className='option-alert-button-group'>
              {buttons.map((button, i) => (
                <button
                  key={i}
                  onClick={() => this.handleClickButton(button)}
                >
                  {button.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function createSVGBlurReconfirm () {
  // If has svg ignore to create the svg
  const svg = document.getElementById('option-alert-firm-svg')
  if (svg) return
  const svgNS = 'http://www.w3.org/2000/svg'
  const feGaussianBlur = document.createElementNS(svgNS, 'feGaussianBlur')
  feGaussianBlur.setAttribute('stdDeviation', '0.3')

  const filter = document.createElementNS(svgNS, 'filter')
  filter.setAttribute('id', 'gaussian-blur')
  filter.appendChild(feGaussianBlur)

  const svgElem = document.createElementNS(svgNS, 'svg')
  svgElem.setAttribute('id', 'option-alert-firm-svg')
  svgElem.setAttribute('class', 'option-alert-svg')
  svgElem.appendChild(filter)

  document.body.appendChild(svgElem)
}

function removeSVGBlurReconfirm () {
  const svg = document.getElementById('option-alert-firm-svg')
  svg.parentNode.removeChild(svg)
  document.body.children[0].classList.remove('option-alert-blur')
}

function createElementReconfirm (properties) {
  let divTarget = document.getElementById('option-alert')
  if (divTarget) {
    // Rerender - the mounted ReactConfirmAlert
    render(<OptionAlert {...properties} />, divTarget)
  } else {
    // Mount the ReactConfirmAlert component
    document.body.children[0].classList.add('option-alert-blur')
    divTarget = document.createElement('div')
    divTarget.id = 'option-alert'
    document.body.appendChild(divTarget)
    render(<OptionAlert {...properties} />, divTarget)
  }
}

function removeElementReconfirm () {
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

export function confirmAlert (properties) {
  addBodyClass()
  createSVGBlurReconfirm()
  createElementReconfirm(properties)
}
