import React, { Component } from 'react';
import './Learn.css';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import queryString from 'query-string';
import apiRequest from '../../Helpers/apiRequest';
import SearchBar from '../../Components/SearchBar/SearchBar';
import { setLoading } from '../../Loading/actions';
import { setPrevRoute } from '../../Routing/actions';


const mapStateToProps = (state, ownProps) => {
  return {
  	user: state.user.user,
    pathName: state.router.location.pathname,
    hash: state.router.location.hash,
    search: state.router.location.search,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (searchKey) => dispatch(push(searchKey)),
		setPrevRoute: (prevRoute) => dispatch(setPrevRoute(prevRoute)),
		setLoading: (loading) => dispatch(setLoading(loading)),
	}
} 

class Learn extends Component {
	constructor(props) {
		super(props);
		this.state = {
			deckList: []
		}
	}

	componentDidMount() {
		this.getSearchKey()
	}

	componentDidUpdate(prevProps) {
		const { search } = this.props;
		if (prevProps.search !== search) {
			this.getSearchKey()
		}
	}

	getSearchKey = () => {
		const { search } = this.props;
		if (search) {
			const values = queryString.parse(search)
			this.handleDeckSearch(values.decksearch)
		} 
	}

	handleDeckSearch = (key) => {
		//api fetch for decks
		const { setLoading } = this.props;
		// setLoading(true)
		// apiRequest({
		// 	endPoint: '/deck-search',
		// 	method: 'POST',
		// 	body: {key} 
		// })
		// 	.then(data => {
		// 		setLoading(false)
		// 		if (data && !data.error) {
		// 			//got deck
		// 		}
		// 	})
		// 	.catch(()=>setLoading(false))
	}


	render() {

		return (
			<div className='page'>
				<SearchBar />
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Learn);