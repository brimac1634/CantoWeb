import React, {Component} from 'react';
import './calendar.styles.css'
import moment from 'moment';
import Week from './calendar.week.component';
import DayNames from './calendar.day-names.component';
import Icon from '../icon/icon.component';

class Calendar extends Component {
	constructor(props) {
		super(props);
		this.state = {
	      month: moment(),
	      selected: moment().startOf('day')
	    };
	    this.previous = this.previous.bind(this);
	    this.next = this.next.bind(this);
	}

	previous() {
	    const { month } = this.state;
    	this.setState({month: month.subtract(1, 'month')});
	}

	next() {
	    const { month } = this.state;
	    this.setState({month: month.add(1,'month')});
	}

	select(day, entry) {
		const { selectEntry } = this.props;
	    this.setState({
	      selected: day.date,
	      month: day.date.clone(),
	    });
	    selectEntry(entry)
    }

    renderWeeks() {
    	const { wods } = this.props;
	    let weeks = [];
	    let done = false;
	    let date = this.state.month.clone().startOf('month').add('w' -1).day('Sunday');
	    let count = 0;
	    let monthIndex = date.month();

	    const { selected, month } = this.state;

	    while (!done) {
	      weeks.push(
	        <Week key={date} 
	          date={date.clone()} 
	          month={month} 
	          wods={wods}
	          select={(day, entry)=>this.select(day, entry)} 
	          selected={selected} />
	      );

	      date.add(1, 'w');
	      
	      done = count++ > 2 && monthIndex !== date.month();
	      monthIndex = date.month();
	    }

	    return weeks;
    };

	renderMonthLabel() {
	    const { month } = this.state;

	    return <span className="month-label"><h2>{month.format("MMMM YYYY")}</h2></span>;
    };

    canGoBack = () => {
    	const { month } = this.state;
	    const pastLimit = new Date()
	    pastLimit.setMonth(pastLimit.getMonth() - 5)
	    return pastLimit < month.toDate()
    }

    canGoNext = () => {
    	const { month } = this.state;
		let date = new Date(), y = date.getFullYear(), m = date.getMonth();
	    const firstOfMonth = new Date(y, m, 1);
	    return firstOfMonth > month.toDate()
    }

	render() {
		const isFirstMonth = this.canGoBack()
		const isLastMonth = this.canGoNext()
		return (
	      <section className="calendar">
	        <header className="header">
	          <div className="month-display calendar-row">
	            <div 
	            	className="arrow fa fa-angle-left" 
	            	onClick={isFirstMonth ? this.previous : null}
	            >
	            	{isFirstMonth &&
	            		<Icon 
							icon='fast-forward' 
							iconSize='25'
							color='cantoWhite'
						/>
	            	}
				</div>
	            {this.renderMonthLabel()}
            	<div 
            		className="arrow fa fa-angle-right" 
            		onClick={isLastMonth ? this.next : null}
            	>
            		{isLastMonth &&
			            <Icon 
							icon='fast-forward' 
							iconSize='25'
							color='cantoWhite'
						/>
					}
				</div>
	          </div>
	          <DayNames />
	        </header>
	        {this.renderWeeks()}
	      </section>
	    );
	}
}

export default Calendar;