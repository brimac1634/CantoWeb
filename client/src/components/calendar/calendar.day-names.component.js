import React from 'react';

import './calendar.styles.scss'

const DayNames = () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return (
        <div className="calendar-row day-names">
            {dayNames.map(day => {
                return (
                    <span className="day" key={day}><h4>{day}</h4></span>
                );
            })}
        </div>
    );
}

export default DayNames;