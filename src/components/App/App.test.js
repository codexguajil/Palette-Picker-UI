import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { shallow } from 'enzyme';

describe('App', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <App />
    ) 
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('has default state', () => {
    const mockState = { activeNav: false };

    expect(wrapper.state()).toEqual(mockState);
  })

  describe('toggleNav', () => {

    it('updates state with a passed in parameter', () => {
      expect(wrapper.state('activeNav')).toEqual(false);
      const mockEvent = { target: { checked: true } };

      wrapper.instance().toggleNav(mockEvent);
      
      expect(wrapper.state('activeNav')).toEqual(true);
    })

  })

})

