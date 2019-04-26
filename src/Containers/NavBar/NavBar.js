import React, {Component} from 'react';
import './NavBar.css';
import { connect } from 'react-redux';
import NavBarButton from './NavBarButton/NavBarButton';
import navSections from './navSections';

const mapStateToProps = (state, ownProps) => {
	return {
		pathName: state.router.location.pathname,
	}
}

class NavBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selected: 'search',
		}
	}

	componentDidMount() {
		this.handleRoute()
	}

	handleRoute = () => {
		const { pathName } = this.props;
		navSections.forEach(section => {
			if (section.to === pathName) {
				this.updateSection(section.title)
			}
		})
	}

	updateSection = (location) => {
		const { selected } = this.state;
		const { navChange } = this.props;
		if (location !== selected) {
			this.setState({selected: location})
			navChange(location)
		}
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
								handleSelect={this.updateSection}
							/>
						);
					})}
				</div>
			</div>
		);
	}
	
}

export default connect(mapStateToProps)(NavBar);