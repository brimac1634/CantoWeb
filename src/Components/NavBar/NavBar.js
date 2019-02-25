import React, {Component} from 'react';
import './NavBar.css';
import NavBarButton from './NavBarButton/NavBarButton';
import navSections from './navSections';

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 'Search',
		}
	}

	handleSelectButton = (title) => {
		const { navChange } = this.props
		this.setState({selected: title})
		navChange(title)
	}

	render() {
		const { selected } = this.state;

		return (
			<div className='nav-bar'>
				<div className='nav-list'>
					{navSections.map(section => {
						let isSelected = false
						if (section.title === selected) {
							isSelected = true
						}
						return (
							<NavBarButton 
								key={section.title}
								to={section.to} 
								icon={section.icon} 
								title={section.title}
								isSelected={isSelected}
								selectButton={this.handleSelectButton}
							/>
						);
					})}
				</div>
			</div>
		);
	}
	
}

export default NavBar;