import React from 'react';
import './Calendar.css'

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
            onClick={()=>select(day)}
        >
            <div className='day-number'>{number}</div>
            <div className='day-canto'>{entry ? entry.canto_word : null}</div>
        </span>
    );
}

export default Day;