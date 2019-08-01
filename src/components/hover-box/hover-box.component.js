import React, {Component} from 'react';
import './hover-box.styles.css';
import MediaQuery from 'react-responsive';
import { connect } from 'react-redux';
import Icon from '../icon/icon.component';
import { Link } from 'react-router-dom';
import { routes } from '../../redux/routing/routing.constants';

const mapStateToProps = state => {
  return {
    prevRoute: state.prevRoute.route,
  }
}

class HoverBox extends Component {
	constructor(props) {
    super(props);
    this.content = React.createRef();
    this.state = {
      childHeight: 0
    }
  }

  componentDidMount() {
    const rect = this.content.current.getBoundingClientRect()
    this.setState({childHeight: rect.height})
  }

  render() {
    const { children, handleClick, prevRoute, canClose, width, height } = this.props;
    const { ROOT } = routes;
    const { childHeight } = this.state;

    const style = {
      width: width ? width : null,
      height: height ? height : null
    }

    return (
      <MediaQuery maxHeight={childHeight}>
          {(matches) => {
            return  <div 
                  className={matches ? 'centered' : 'center-div'}
                >
                  <div className='hover-box-container' style={style}>
                    {canClose &&
                      <Link to={prevRoute ? prevRoute : ROOT}>
                        <button 
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