import React from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import Icon from '../../components/icon/icon.component';

import homeList from './home.data';

import './home.styles.scss';

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (url) => dispatch(push(url)),
	}
} 

const Home = ({ updateURL }) => (
	<div className='home-page'>
		<div className='inner-home'>
			<div className='home-welcome'>
				<h1>Welcome to CantoTalk</h1>
				<p>Current day Cantonese, when you need it</p>
			</div>
			<div className='home-item-list'>
				{homeList.map(item => {
					return (
						<div 
							key={item.title}
							className='home-item' 
							onClick={()=>updateURL(item.route)}
						>
							<Icon icon={item.icon} iconSize='30' />
							<h2>{item.title}</h2>
							<p>{item.description}</p>
						</div>
					)
				})}
			</div>
		</div>
	</div>
);

export default connect(null, mapDispatchToProps)(Home);