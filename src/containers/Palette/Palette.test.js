import React from 'react';
import ReactDOM from 'react-dom';
import { Palette } from './Palette';
import { shallow } from 'enzyme';

describe('Palette', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <Palette />
    )
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should have default state', () => {
    let mockState = { colors: [] };
    expect(wrapper.state()).toEqual(mockState);
  })

  describe('handleKeydown(event)', () => {

    it.skip('should be invoked on any key press', () => {
      const mockSpy = jest.spyOn(wrapper.instance(), 'handleKeydown');
      const keyCode = { keyCode: 13 };

      wrapper.simulate('keydown', keyCode);

      expect(mockSpy).toHaveBeenCalledWith(keyCode);
    })

    it('should invoke regeneratePalette on space key press', () => {
      const mockEvent = { keyCode: 32 };
      const mockSpy = jest.spyOn(wrapper.instance(), 'regeneratePalette');

      wrapper.instance().handleKeydown(mockEvent);

      expect(mockSpy).toHaveBeenCalled();
    })

  })

  describe('regeneratePalette(colors = [])', () => {

    it('should update state', () => {
      expect(wrapper.state('colors').length).toEqual(0)
      wrapper.instance().regeneratePalette();
      expect(wrapper.state('colors').length).toEqual(5)
    })

  })

  describe('generateColor()', () => {

    it('should return a random hex code with a length of 7', () => {
      let hexColor = wrapper.instance().generateColor();
      expect(hexColor.length).toEqual(7);
    })

    it('should return a random hex code starting with a hash symbol', () => {
      let hexColor = wrapper.instance().generateColor();
      expect(hexColor.slice(0, 1)).toEqual('#');
    })

  })

  describe('toggleLocked(hex)', () => {

    it('should update state', () => {
      wrapper.instance().regeneratePalette();
      const initialState = wrapper.state('colors');

      wrapper.instance().toggleLocked(initialState[1].hex);

      expect(wrapper.state('colors')).toEqual(initialState);
    })

  })

})