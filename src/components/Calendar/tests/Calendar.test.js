import React from 'react';
import { shallow } from 'enzyme';
import Calendar from '../index';

const defaultProps = {};

describe('Calendar', () => {
  it('renders without crashing', () => {
    shallow(<Calendar {...defaultProps} />);
  });
});
