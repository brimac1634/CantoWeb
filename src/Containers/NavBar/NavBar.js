import React, {Component} from 'react';
import './NavBar.css';
import {withRouter} from 'react-router-dom';
import {parseRoutePath} from '../../routeHelper';
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
		let location = parseRoutePath(pathName, 0)
		navSections.forEach(section => {
			if (section.to === location) {
				location = section.title
			}
		})
		this.updateSection(location)
	}

	updateSection = (location) => {
		const {selected} = this.state;
		const { navChange } = this.props;
		if (location !== selected) {
			this.setState({selected: location})
			navChange(location)
		}
	}

	componentDidMount() {
		this.handleRoute()
	}

	componentDidUpdate() {
		this.handleRoute()
	}

	render() {
		const { selected } = this.state;

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