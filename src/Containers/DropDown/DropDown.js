import React, {Component} from 'react';
import '../../Helpers/Compound/Compound.css';
import IconListItem from '../../Components/IconListItem/IconListItem';

class DropDown extends Component {
	constructor(props) {
		super(props);
		this.state = {
			height: '',
		}
		this.content = React.createRef();
	}

	componentDidMount() {
		if (this.content.current.firstChild) {
			const rect = this.content.current.getBoundingClientRect();
			this.setState({
				height: rect.height,
			})
		}
	}

	handleSelect = (item) => {
		const { closeOnClick } = this.props;
		closeOnClick()
		console.log(item)
	}
	
	render() {
		const { height } = this.state;
		const { 
			list,
			animateOut,
			triggerRect: {
				x,
				y,
				width,
			} 
		} = this.props;
		const triggerHeight = this.props.triggerRect.height;

		let popType = 'animate-in'

		if (animateOut === true) {
			popType = 'animate-out';
		}

		return (
			<div 
				className={`drop-down ${popType}`} 
				style={{width: `${width}px`, height: `${height}px`, top: `${y + triggerHeight - 10}px`, left: `${x}px`}}
			>
				<div ref={this.content}>
					{
						list.map((item, i) => {
							return (
								<IconListItem 
									key={i}
									title={item} 
									handleClick={()=>this.handleSelect(item)}/>
							)
						})
					}
				</div>
			</div>
		);
	}
	
}

export default DropDown;