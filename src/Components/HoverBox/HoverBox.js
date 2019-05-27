import React, {Component} from 'react';
import './HoverBox.css';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import Icon from '../../Components/Icon/Icon';
import { Link } from 'react-router-dom';
import { routes } from '../../Routing/constants';

const mapStateToProps = state => {
  return {
    prevRoute: state.prevRoute.route,
  }
}

class HoverBox extends Component {
	constructor(props) {
    super(props);
    this.content = React.createRef();
    this.close = React.createRef();
    this.state = {
      childHeight: 0
    }
  }

  componentDidMount() {
    const { handleClick } = this.props;
    const rect = this.content.current.getBoundingClientRect()
    this.setState({childHeight: rect.height})
    this.close.addEventListener('touchend', handleClick)
  }

  render() {
    const { children, handleClick, prevRoute, canClose } = this.props;
    const { ROOT } = routes;
    const { childHeight } = this.state;

    return (
      <MediaQuery maxHeight={childHeight}>
          {(matches) => {
            return  <div 
                  className={matches ? 'centered' : 'center-div'}
                >
                  <div className='hover-box-container'>
                    {canClose &&
                      <Link to={prevRoute ? prevRoute : ROOT}>
                        <button 
                          ref={this.close}
                          className='hover-close' 
                          onClick={handleClick}
                        >
                            <Icon 
                              icon='multiply' 
                              iconStyle='dark' 
                              width='15'
                            />
                          </button>
                      </Link>
                    }
                    <div ref={this.content}>
                      {children}
                    </div>
                  </div>
                </div>
          }}
      </MediaQuery>
    );
  }
}

export default connect(mapStateToProps, null)(HoverBox);