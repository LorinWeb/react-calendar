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

  extractDateProps = (date, keepDay = true) => {
    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      day: keepDay ? date.getDate() : null
    };
  };

  setDate(date) {
    this.setState({
      ...this.state,
      date: { ...date }
    });
  }

  shiftYear(amount, date = this.state.date) {
    return this.setDate({
      ...date,
      year: date.year + amount,
      day: null
    });
  }

  shiftMonth(amount, date = this.state.date) {
    return this.setDate(
      this.extractDateProps(new Date(date.year, date.month + amount, 1), false)
    );
  }

  shiftDay(amount, date = this.state.date) {
    return this.setDate(
      this.extractDateProps(new Date(date.year, date.month, date.day + amount))
    );
  }

  getToday() {
    return this.extractDateProps(new Date());
  }

  setToday() {
    this.setDate(this.getToday());
  }

  countDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  getDateObjects = (year, month) => {
    const date = this.extractDateProps(new Date(year, month, 1));
    return Array(this.countDaysInMonth(date.year, date.month))
      .fill(date)
      .map((date, i) => ({ ...date, day: i + 1 }));
  };

  getDaysToDisplay = (year, month) => {
    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysFromPrevMonth = Math.abs(
      this.state.startWeekOnMonday
        ? firstDayIndex === 0 ? 6 : firstDayIndex - 1
        : firstDayIndex
    );
    const thisMonth = this.getDateObjects(year, month);
    const daysFromNextMonth = 42 - (daysFromPrevMonth + thisMonth.length);
    return (daysFromPrevMonth > 0
      ? this.getDateObjects(year, month - 1).splice(-daysFromPrevMonth)
      : []
    ).concat(
      thisMonth,
      this.getDateObjects(year, month + 1).splice(0, daysFromNextMonth)
    );
  };

  render() {
    let dayNames = this.props.dayNames;
    if (this.state.startWeekOnMonday) {
      dayNames = [...dayNames, dayNames[0]];
      dayNames.shift();
    }

    return (
      <div className="Calendar">
        <header className="Calendar__Header">
          <div className="Calendar__DateDisplayer">
            <span className="Calendar__Month">
              {this.props.monthNames[this.state.date.month]}
            </span>
            <span className="Calendar__Year">{this.state.date.year}</span>
          </div>
          <div className="Calendar__DateShifter">
            <button onClick={e => this.shiftMonth(-1)}>&lt;</button>
            <button onClick={e => this.setToday()}>Today</button>
            <button onClick={e => this.shiftMonth(1)}>&gt;</button>
          </div>
        </header>

        <CalendarMonth
          selectedDays={[JSON.stringify(this.state.date)]}
          days={this.getDaysToDisplay(
            this.state.date.year,
            this.state.date.month
          )}
          dayNames={dayNames}
          onSelectDay={this.setDate.bind(this)}
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
  dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
};

Calendar.propTypes = {
  dayNames: PropTypes.array,
  monthNames: PropTypes.array,
  startWeekOnMonday: PropTypes.bool
};

export default Calendar;
