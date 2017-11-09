import React from 'react';
import PropTypes from 'prop-types';
import CalendarMonth from '../CalendarMonth';
import './styles.css';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startWeekOnMonday: !!this.props.startWeekOnMonday
    };
  }

  componentWillMount() {
    this.setToday();
  }

  convertToCustomDateObject = (date, keepDay = true) => {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: keepDay ? date.getDate() : null
    };
  };

  convertToNativeDate = date => new Date(date.year, date.month, date.day);

  setDate(date) {
    this.setState({
      ...this.state,
      date: { ...date }
    });
  }

  shiftYear(amount, date = this.state.date) {
    const newDate = {
      ...date,
      year: date.year + amount,
      day: null
    };
    return this.setDate(newDate);
  }

  shiftMonth(amount, date = this.state.date) {
    const newDate = this.convertToCustomDateObject(
      this.convertToNativeDate({
        ...date,
        month: date.month + amount,
        day: 1
      }),
      false
    );
    return this.setDate(newDate);
  }

  shiftDay(amount, date = this.state.date) {
    const newDate = this.convertToCustomDateObject(
      this.convertToNativeDate({
        ...date,
        day: date.day + amount
      })
    );
    return this.setDate(newDate);
  }

  setToday() {
    this.setDate(this.convertToCustomDateObject(new Date()));
  }

  render() {
    const self = this;
    return (
      <div className="Calendar">
        <header>
          <div className="Calendar_ShiftDateControls">
            <button onClick={e => this.shiftMonth(-1)}>&lt;</button>
            <button onClick={e => this.setToday()}>Today</button>
            <button onClick={e => this.shiftMonth(1)}>&gt;</button>
          </div>
          <div className="Calendar_Date">
            <span className="Calendar__Month">
              {this.props.monthNames[this.state.date.month]}
            </span>
            <span className="Calendar__Year">{this.state.date.year}</span>
          </div>
        </header>

        <CalendarMonth
          year={this.state.date.year}
          month={this.state.date.month}
          day={this.state.date.day}
          startWeekOnMonday={this.state.startWeekOnMonday}
          onSelectDay={function() {
            self.setDate({
              ...self.state.date,
              day: this.day
            });
          }}
        />
      </div>
    );
  }
}

Calendar.defaultProps = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],
  weekDayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};

Calendar.propTypes = {
  weekDayNames: PropTypes.array,
  monthNames: PropTypes.array
};

export default Calendar;
