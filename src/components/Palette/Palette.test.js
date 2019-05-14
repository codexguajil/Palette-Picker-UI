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

      wrapper.simulate('keyown', keyCode);

      expect(mockSpy).toHaveBeenCalledWith(keyCode);
    })

    it('should invoke generatePalette on space key press', () => {
      const mockEvent = { keyCode: 32 };
      const mockSpy = jest.spyOn(wrapper.instance(), 'generatePalette');

      wrapper.instance().handleKeydown(mockEvent);

      expect(mockSpy).toHaveBeenCalled();
    })

  })

  describe('generatePalette()', () => {

    it('should update state', () => {
      expect(wrapper.state('colors').length).toEqual(0)

      wrapper.instance().generatePalette();

      expect(wrapper.state('colors').length).toEqual(5)
    })

    it('should invoke generateBaseColor', () => {
      expect(wrapper.state('colors')).toEqual([]);
      const mockSpy = jest.spyOn(wrapper.instance(), 'generateBaseColor');

      wrapper.instance().generatePalette();

      expect(mockSpy).toHaveBeenCalled();
    })

    it('should invoke generateColor', () => {
      const mockSpy = jest.spyOn(wrapper.instance(), 'generateColor');

      wrapper.instance().generatePalette();

      expect(mockSpy).toHaveBeenCalled();
    })

  })

  describe('generateBaseColor()', () => {

    it('should return an HSL array with 3 elements', () => {
      const results = wrapper.instance().generateBaseColor();

      expect(results.length).toEqual(3);
    })

  })

  describe('generateColor(baseHSL, prevHSL)', () => {

    it('should return an HSL array based on its parameters', () => {
      let baseHSL = [225, 33, 59];
      let prevHSL = [338, 29, 63];

      let hslColor = wrapper.instance().generateColor(baseHSL, prevHSL);

      expect(hslColor.length).toEqual(3);
    })

  })

  describe('numberGenerator(min, max)', () => {

    it('should return a random number within the given parameters', () => {
      let mockMin = 0;
      let mockMax = 0;

      const results = wrapper.instance().numberGenerator(mockMin, mockMax);

      expect(results).toBeGreaterThanOrEqual(mockMin);
      expect(results).toBeLessThanOrEqual(mockMax);
    })

  })

  describe('toggleLocked(hex)', () => {

    it('should update state', () => {
      wrapper.instance().generatePalette();
      const initialState = wrapper.state('colors');

      wrapper.instance().toggleLocked(initialState[1].hex);

      expect(wrapper.state('colors')).toEqual(initialState);
    })

  })

})