import React from 'react';
import ReactDOM from 'react-dom';
import Palette from './Palette';
import { shallow } from 'enzyme';

describe('Palette', () => {

  let wrapper;

  beforeEach = () => {
    wrapper = shallow(
      <Palette />
    )
  }

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
})