import React from 'react';
import PropTypes from 'prop-types';
import CalendarDay from '../CalendarDay';
import './styles.css';

export const CalendarMonth = ({
  year,
  month,
  day,
  weekDayNames,
  startWeekOnMonday,
  reminders,
  onSelectDay
}) => {
  const countDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const getDaysToDisplay = (year, month) => {
    const firstDayIndex = new Date(year, month, 1).getDay();

    const endOfPrevMonth = Array(
      Math.abs(
        startWeekOnMonday
          ? firstDayIndex === 0 ? 6 : firstDayIndex - 1
          : firstDayIndex
      )
    ).fill();

    const thisMonth = Array(countDaysInMonth(year, month))
      .fill()
      .map((day, i) => i + 1);

    const endOfNextMonth = [];

    return {
      endOfPrevMonth,
      thisMonth,
      endOfNextMonth
    };
  };

  if (startWeekOnMonday) {
    weekDayNames = [...weekDayNames, weekDayNames[0]];
    weekDayNames.shift();
  }

  weekDayNames = weekDayNames.map(label => label.substring(0, 3));

  const currentDate = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate()
  };

  const currentYearAndMonthAreSelected =
    currentDate.year === year && currentDate.month === month;

  const daysToDisplay = getDaysToDisplay(year, month);

  return (
    <div className="CalendarMonth">
      <ul className="CalendarMonth__GridHeaders">
        {weekDayNames.map((dayLabel, i) => (
          <li className="CalendarMonth__WeekDayName" key={i}>
            {dayLabel}
          </li>
        ))}
      </ul>
      <ul className="CalendarMonth__Days">
        {daysToDisplay.endOfPrevMonth.map((day, i) => (
          <li className="CalendarMonth__DayPlaceholder" key={i} />
        ))}
        {daysToDisplay.thisMonth.map((thisDay, i) => {
          const isToday =
            currentYearAndMonthAreSelected && currentDate.day === thisDay;
          const isSelected = day === thisDay;

          return (
            <CalendarDay
              key={i}
              day={thisDay}
              isToday={isToday}
              isSelected={isSelected}
              reminders={reminders.filter(
                reminder =>
                  reminder.date.year === year &&
                  reminder.date.month === month &&
                  reminder.date.day === thisDay
              )}
              onClickCallback={e => {
                e.preventDefault();
                return onSelectDay && onSelectDay.bind({ day: thisDay })();
              }}
            />
          );
        })}
      </ul>
    </div>
  );
};

CalendarMonth.defaultProps = {
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: null,
  weekDayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ],
  startWeekOnMonday: false,
  reminders: []
};

CalendarMonth.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  day: PropTypes.number,
  weekDayNames: PropTypes.array,
  startWeekOnMonday: PropTypes.bool,
  reminders: PropTypes.array,
  onSelectDay: PropTypes.func
};

export default CalendarMonth;
