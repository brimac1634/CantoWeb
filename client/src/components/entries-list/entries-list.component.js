import React from 'react';

import EntryRow from '../entry-row/entry-row.component';
import Button from '../button/button.component';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { routes } from '../../redux/routing/routing.constants';

import './entries-list.styles.scss';

const mapStateToProps = (state, ownProps) => {
  return {
    search: state.router.location.search,
    pathName: state.router.location.pathname,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		updateURL: (url) => dispatch(push(url)),
	}
} 

const EntryList = ({ entries, selectEntry, searchComplete, updateURL, search, pathName, addedList, isDisabled, hideGhost, showX, handleX }) => {
	let ghostRows = [0,1,2,3,4,5,6]

	const renderMessage = () => {
		const { CONTACT, SEARCH } = routes;
		if (entries.length === 0 && searchComplete) {
			return (
				<div className='no-entries'>
					{pathName === SEARCH && search
						?	<span>
								<p className='no-match'>Don't see what you're looking for?<br/>Request for it to be added!</p>
								<Button 
									title='Request Word'
									margin='10px 5px'
									handleClick={()=>updateURL(CONTACT)}
								/>
							</span>
						:   <p className='no-match'>No match found</p>
					}
				</div>
			)
		}
	}
	
	return (
		<div className='entry-list'>
			{renderMessage()}
			{
				entries.length || (searchComplete && search)
				?   entries.map((entry, i) => {
						return (
							<EntryRow
								key={entry.entry_id}
								selectEntry={selectEntry}
								entry={entry}
								addedList={addedList}
								isDisabled={isDisabled}
								showX={showX}
								handleX={handleX}
							/>
						);
					})
					
				:   !hideGhost &&
					ghostRows.map(i => {
						return (
							<EntryRow
								key={i}
								entry=''
							/>
						);
					})
			}

		</div>
	);
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryList);