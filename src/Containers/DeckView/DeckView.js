import React, { Component } from 'react';
import './Learn.css';
import { connect } from 'react-redux';
import apiRequest from '../../Helpers/apiRequest';
import { setLoading } from '../../Loading/actions';


const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
    pathName: state.router.location.pathname,
    hash: state.router.location.hash,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		setLoading: (loading) => dispatch(setLoading(loading)),
	}
} 

class DeckView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			entries: []
		}
	}

	componentDidMount() {
		this.getDeckEntries()
	}

	getDeckEntries = () => {
		const { setLoading, deck: { deck_id } } = this.props;
		setLoading(true)
		apiRequest({
			endPoint: 'deck-entries',
			method: 'POST',
			body: {deck_id} 
		})
			.then(data => {
				setLoading(false)
				if (data && !data.error) {
					this.setState({entries: data})
				}
			})
			.catch(err=>{
				console.log(err)
				setLoading(false)
			})
	}


	render() {
		const { entries } = this.state;
		
		return (
			<div className='page'>
				
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckView);