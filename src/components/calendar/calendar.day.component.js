import React from 'react';

import './calendar.styles.scss'

const Day = (props) => {
	const {
        day,
        day: {
            date,
            isCurrentMonth,
            isToday,
            number
        },
        entry,
        select,
        selected
    } = props;

    return (
        <span 
            key={date.toString()} 
            className={'day' + (isToday ? ' today' : '') + (isCurrentMonth ? '' : ' different-month') + (date.isSame(selected) ? ' selected' : '')} 
            onClick={()=>select(day, entry)}
        >
            <div className='day-number'>{number}</div>
            <div className='day-canto'>
                <p>{entry ? entry.canto_word : null}</p>
            </div>
        </span>
    );
}

export default Day;