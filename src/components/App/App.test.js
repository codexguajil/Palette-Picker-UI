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
    const mockState = { 
      activeNav: false,
      currHex: [] 
    };

    expect(wrapper.state()).toEqual(mockState);
  })

  describe('toggleNav(e)', () => {

    it('updates state with a passed in parameter', () => {
      expect(wrapper.state('activeNav')).toEqual(false);
      const mockEvent = { target: { checked: true } };

      wrapper.instance().toggleNav(mockEvent);
      
      expect(wrapper.state('activeNav')).toEqual(true);
    })

  })

  describe('setHex(hex)', () => {

    it('should update state with the passed in value', () => {
      expect(wrapper.state('currHex')).toEqual([]);
      const mockHex = [
        { hex: "#6484C4", locked: false },
        { hex: "#458EA1", locked: false },
        { hex: "#3E7A72", locked: false },
        { hex: "#2F5040", locked: false },
        { hex: "#2B362D", locked: false }
      ];

      wrapper.instance().setHex(mockHex);

      expect(wrapper.state('currHex')).toEqual(mockHex);
    })

  })

})

