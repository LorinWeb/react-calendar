import React from 'react';
import { shallow } from 'enzyme';
import CalendarMonth from '../index';

const defaultProps = {};

describe('CalendarMonth', () => {
  it('renders without crashing', () => {
    shallow(<CalendarMonth {...defaultProps} />);
  });
});
