import React, {Component} from 'react';
import './PopUp.css';
import Icon from '../Icon/Icon';


class PopUp extends Component {
	constructor(props) {
		super()
		this.state = {
			show: true
		}
	}

	transitionOut = () => {
		const { popUpToggle } = this.props;
		this.setState({
			show: false,
		})
		setTimeout(() => popUpToggle('home'), 1100);
	}

	render() {
		const { show } = this.state;

		let fadeType = 'animate-fade-in'
		let popType = 'animate-pop-in'

		if (!show) {
			fadeType = 'animate-fade-out'
			popType = 'animate-pop-out'
		}

		return (
			<div className={`shade-background ${fadeType}`}>
				<div className={`sign-in-box ${popType}`}>
					<button className='close' onClick={this.transitionOut}>
						<Icon 
							icon='multiply' 
							iconStyle='dark' 
							width='15'
						/>
					</button>
					{this.props.children}
				</div>
			</div>
		);
	}
	
}

export default PopUp;