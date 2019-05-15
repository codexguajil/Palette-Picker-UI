import React from 'react';
import ReactDOM from 'react-dom';
import { Nav } from './Nav';
import { shallow } from 'enzyme';

describe('Nav', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Nav />
    )
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('navClassBuilder(boolean)', () => {

    it('should invoke navClassBuilder on component mount', () => {
      const mockSpy = jest.spyOn(wrapper.instance(), 'navClassBuilder');

      wrapper.instance().navClassBuilder(false);

      expect(mockSpy).toHaveBeenCalledWith(false);
    })

    it('should return "Nav active" if the boolean parameter is true', () => {
      const navClass = wrapper.instance().navClassBuilder(true);

      expect(navClass).toEqual('Nav active');
    })

    it('should return "Nav " if the boolean parameter is false', () => {
      const navClass = wrapper.instance().navClassBuilder(false);

      expect(navClass).toEqual('Nav ');
    })

  })

  describe('fetchProjects()', () => {

    it('should return an array of project objects', () => {

    })

  })

})