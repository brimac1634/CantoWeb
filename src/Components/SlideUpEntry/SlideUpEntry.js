import React from 'react';
import ReactDOM from 'react-dom';
import './SlideUpEntry.css';
import EntryView from '../EntryView/EntryView';
import { connect } from 'react-redux';
import { setMobileEntry } from '../../Containers/Search/actions';

const mapDispatchToProps = (dispatch) => {
	return {
		setMobileEntry: (entryID) => dispatch(setMobileEntry(entryID)),
	}
} 

const SlideUpEntry = ({ isSelected, selectedEntry, setMobileEntry }) => {

	const entryViewMobile = isSelected 
			? 'visible-entry-view' 
			: 'hidden-entry-view'

	return ReactDOM.createPortal(
        <span onClick={event => event.stopPropagation()}>
            {isSelected
	              ? <div className='back-div animate-in' onClick={()=>setMobileEntry('')}>&nbsp;</div>
	              : null
	        }
			<div 
				className={`entry-view-container ${entryViewMobile}`}
			>
				<div className='entry-view-sizer'>
					<EntryView
						selectedEntry={selectedEntry} 
					/>
				</div>
			</div>
        </span>
        , document.body
    );
}

export default connect(null, mapDispatchToProps)(SlideUpEntry);