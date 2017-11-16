import React from 'react';
import PropTypes from 'prop-types';
import CalendarDay from '../CalendarDay';

export const CalendarMonth = ({
  days,
  dayNames,
  selectedDays,
  onSelectDay
}) => {
  dayNames = dayNames.map(label => label.substring(0, 3));

  const currentDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
  };

  return (
    <div className="CalendarMonth">
      <ul className="Calendar__Grid Calendar__Grid--header">
        {dayNames.map((dayLabel, i) => (
          <li className="Calendar__DayName" key={i}>
            {dayLabel}
          </li>
        ))}
      </ul>
      <ul className="Calendar__Grid Calendar__Grid--month">
        {days.map((thisDate, i) => {
          const stringifiedDate = JSON.stringify(thisDate);
          const isToday = stringifiedDate === JSON.stringify(currentDate);
          const isSelected = selectedDays.indexOf(stringifiedDate) !== -1;

          return (
            <CalendarDay
              key={stringifiedDate}
              day={thisDate.day}
              isToday={isToday}
              isSelected={isSelected}
              onClickCallback={e => {
                e.preventDefault();
                return onSelectDay(thisDate);
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};

CalendarMonth.defaultProps = {
  onSelectDay: () => {}
};

CalendarMonth.propTypes = {
  days: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number.isRequired,
      month: PropTypes.number.isRequired,
      day: PropTypes.number.isRequired
    })
  ).isRequired,
  dayNames: PropTypes.array.isRequired,
  onSelectDay: PropTypes.func
};

export default CalendarMonth;
