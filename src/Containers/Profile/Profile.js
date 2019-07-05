import React from 'react';
import './Profile.css';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';
import { connectionError } from '../../Helpers/helpers';
import { optionAlert } from '../OptionAlert/OptionAlert';
import HoverBox from '../../Components/HoverBox/HoverBox';
import Button from '../../Components/Button/Button';
import { push } from 'connected-react-router'
import { routes } from '../../Routing/constants';
import apiRequest from '../../Helpers/apiRequest';
import { setLoading } from '../../Loading/actions';
import { setUser } from '../SignIn/actions';
import { deleteToken } from '../../Helpers/helpers';

const mapStateToProps = state => {
	return {
		user: state.user.user,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setLoading: (loading) => dispatch(setLoading(loading)),
		updateURL: (path) => dispatch(push(path)),
		updateUser: (user) => dispatch(setUser(user)),
	}
}

const Profile = ({ user: { userName, userEmail }, setLoading, updateURL, updateUser }) => {

	const { RESET, SEARCH } = routes;

	const verifyDeletion = (event) => {
		optionAlert({
		    title: 'Account Deletion',
		    message: 'Are you sure you want to delete your account and all your saved data?',
		    buttons: [
		    	{
		    		label: 'Yes',
			        onClick: () => handleDelete()
		    	},
		    	{
		    		label: 'No',
			        onClick: () => {}
		    	},
		    ]
	    })
	    event.preventDefault();
	}

	const handleDelete = () => {
		setLoading(true)
		apiRequest({
			endPoint: '/delete-account',
			method: 'POST',
			body: {userEmail} 
		})
			.then(res => {
				setLoading(false)
				if (res && res.error != null) {
					const { title, message } = res.error;
					optionAlert({title, message})
				} else {
					updateUser('');
					deleteToken()
					optionAlert({
					    title: 'Account Deleted',
					    message: 'Your user account has successfully been deleted.',
					    buttons: [
					    	{
					    		label: 'Okay',
						        onClick: () => updateURL(SEARCH)
					    	},
					    ]
				    })
				}
			})
			.catch(() => {
				setLoading(false)
				connectionError()
			})
	}

	return (
		<MediaQuery maxWidth={574}>
			{(matches) => {
			return (
				<HoverBox>
					<div className='profile'>
						<div className='profile-inner'>
							<h2>Hello, {userName}!</h2>
							<div className='section'>
								<p><strong>Want to reset your password?</strong></p>
								<p>You will need to verify your email to reset your password.</p>
								<Button 
									title='Reset'
									buttonType='ghost' 
									icon='shuffle' 
									height='44px'
									margin='0'
									width='100px'
									handleClick={()=>updateURL(RESET)}
								/>
							</div>
							<div className='section'>
								<p><strong>Wish to delete you account?</strong></p>
								<p>Beware! This will delete your account and any saved data related to your account.</p>
								<Button 
									title='Delete'
									buttonType='ghost' 
									icon='multiply' 
									height='44px'
									margin='0'
									width='100px'
									handleClick={verifyDeletion}
								/>
							</div>
						</div>
					</div>
				</HoverBox>
			)}}
		</MediaQuery>
	);	
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
