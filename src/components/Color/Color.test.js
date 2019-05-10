import React from 'react';
import ReactDOM from 'react-dom';
import Color from './Color';
import { shallow } from 'enzyme';

describe('Color', () => {

  let wrapper;

  beforeEach = () => {
    wrapper = shallow(
      <Color />
    )
  }

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})