import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';

export const CalendarDay = ({
  day,
  isToday,
  isSelected,
  reminders,
  onClickCallback
}) => {
  return (
    <li
      className={
        'CalendarDay' +
        (isSelected ? ' CalendarDay--selected' : '') +
        (isToday ? ' CalendarDay--today' : '')
      }
      onClick={onClickCallback}
    >
      <div>
        <button onClick={onClickCallback} className="Calendar__DayNumber">
          {day}
        </button>
        {!!reminders.length && (
          <ul className="CalendarDay__Reminders">
            {reminders.map((reminder, i) => (
              <li key={reminder.id} title={reminder.text}>
                {reminder.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
};

CalendarDay.defaultProps = {
  day: new Date().getDate(),
  isToday: false,
  isSelected: false,
  reminders: []
};

CalendarDay.propTypes = {
  day: PropTypes.number.isRequired,
  isToday: PropTypes.bool,
  isSelected: PropTypes.bool,
  reminders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.shape({
        year: PropTypes.number,
        month: PropTypes.number,
        day: PropTypes.number
      }).isRequired,
      text: PropTypes.string.isRequired
    })
  ),
  onClickCallback: PropTypes.func
};

export default CalendarDay;
