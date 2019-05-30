import React from 'react';
import './Calendar.css'

const DayNames = () => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	return (
        <div className="calendar-row day-names">
            {dayNames.map(day => {
                return (
                    <span className="day"><h4>{day}</h4></span>
                );
            })}
        </div>
    );
}

export default DayNames;