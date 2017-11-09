import React from 'react';
import { shallow } from 'enzyme';
import CalendarDay from '../index';

const defaultProps = {};

describe('CalendarDay', () => {
  it('renders without crashing', () => {
    shallow(<CalendarDay {...defaultProps} />);
  });
});
