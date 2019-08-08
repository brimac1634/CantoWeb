import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { SwapSpinner } from "react-spinners-kit";

import EntryView from '../entry-view/entry-view.component';
import Icon from '../icon/icon.component';

import { setMobileEntry } from '../../redux/search/search.actions';

import './slide-up-entry.styles.scss';

const mapStateToProps = state => {
  return {
    loading: state.loading.loading,
    hash: state.router.location.hash,
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
        <span className='slide-up-entry' onClick={event => event.stopPropagation()}>
            {isSelected
	              ? <div className='back-div animate-in'>&nbsp;</div>
	              : null
	        }
			<div 
				className={`entry-view-container ${entryViewMobile}`}
				onClick={()=>setMobileEntry('')}
			>
				<div className='entry-view-sizer' onClick={event => event.stopPropagation()}>
					<button 
                      className='close-btn ' 
                      onClick={()=>setMobileEntry('')}
                    >
                        <Icon 
                          icon='multiply' 
                          iconStyle='dark' 
                          width='15'
                        />
                    </button>
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