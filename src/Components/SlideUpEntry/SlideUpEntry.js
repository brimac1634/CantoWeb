import React from 'react';
import ReactDOM from 'react-dom';
import './SlideUpEntry.css';
import EntryView from '../EntryView/EntryView';
import { connect } from 'react-redux';
import { setMobileEntry } from '../../Containers/Search/actions';
import { SwapSpinner } from "react-spinners-kit";

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
		setMobileEntry: (entryID) => dispatch(setMobileEntry(entryID)),
	}
} 

const SlideUpEntry = ({ isSelected, selectedEntry, setMobileEntry, loading, updateFavs }) => {

	const entryViewMobile = isSelected 
			? 'visible-entry-view' 
			: 'hidden-entry-view'

	return ReactDOM.createPortal(
        <span onClick={event => event.stopPropagation()}>
            {isSelected
	              ? <div className='back-div animate-in'>&nbsp;</div>
	              : null
	        }
			<div 
				className={`entry-view-container ${entryViewMobile}`}
				onClick={()=>setMobileEntry('')}
			>
				<div className='entry-view-sizer' onClick={event => event.stopPropagation()}>
					<EntryView
						selectedEntry={selectedEntry}
						updateFavs={updateFavs} 
					/>
					<div className='spinner'>
		                <SwapSpinner
		                  size={60}
		                  color='#ff7a8a'
		                  loading={loading}
		                />
	                </div>
				</div>
			</div>
        </span>
        , document.body
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SlideUpEntry);