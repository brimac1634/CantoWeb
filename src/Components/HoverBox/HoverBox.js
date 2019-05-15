import React from 'react';
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

const HoverBox = ({ children, handleClick, prevRoute, canClose }) => {
	const { ROOT } = routes;

	return (
    <MediaQuery maxWidth={660}>
        {(matches) => {
          return  <div 
                className={matches ? 'centered' : 'center-div'}
              >
            		<div className='hover-box-container'>
                  {canClose &&
                    <Link to={prevRoute ? prevRoute : ROOT}>
                      <button className='hover-close' onClick={handleClick}>
                          <Icon 
                            icon='multiply' 
                            iconStyle='dark' 
                            width='15'
                          />
                        </button>
                    </Link>
                  }
                    {children}
            		</div>
              </div>
        }}
    </MediaQuery>
	);
}

export default connect(mapStateToProps, null)(HoverBox);