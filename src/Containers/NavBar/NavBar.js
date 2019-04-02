import React, {Component} from 'react';
import './NavBar.css';
import {withRouter} from 'react-router-dom';
import NavBarButton from './NavBarButton/NavBarButton';
import navSections from './navSections';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 'Search',
		}
	}

	handleRoute = () => {
		const pathName = this.props.location.pathname;
		let location = pathName.split('/', 2)[1];
		location = `/${location}`
		const {selected} = this.state;
		const { navChange } = this.props
		navSections.forEach(section => {
			if (section.to === location) {
				location = section.title
				console.log(section.title)
			}
		})
		if (location !== selected) {
			this.setState({selected: location})
			navChange(location)
		}
	}

	render() {
		const { selected } = this.state;
		this.handleRoute()
		return (
			<div className='nav-bar'>
				<div className='nav-list'>
					{navSections.map(section => {
						const isSelected = (section.title === selected)
							? true
							: false
						
						return (
							<NavBarButton 
								key={section.title}
								to={section.to} 
								icon={section.icon} 
								title={section.title}
								isSelected={isSelected}
							/>
						);
					})}
				</div>
			</div>
		);
	}
	
}

export default withRouter(NavBar);