import React from 'react';
import './Calendar.css'

const DayNames = () => {
	return (
        <div className="calendar-row day-names">
            <span className="day">Sun</span>
            <span className="day">Mon</span>
            <span className="day">Tue</span>
            <span className="day">Wed</span>
            <span className="day">Thu</span>
            <span className="day">Fri</span>
            <span className="day">Sat</span>
        </div>
    );
}

export default DayNames;