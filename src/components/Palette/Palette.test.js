import React from 'react';
import ReactDOM from 'react-dom';
import { Palette } from './Palette';
import { shallow } from 'enzyme';

describe('Palette', () => {

  let wrapper;
  let mockColors = [
    { hex: "#6484C4", locked: false },
    { hex: "#458EA1", locked: false },
    { hex: "#3E7A72", locked: false },
    { hex: "#2F5040", locked: false },
    { hex: "#2B362D", locked: false }
  ]
  let mockEvent = { 
    keyCode: 32, 
    path: [
      { id: 'palette' }
    ]
  };
  let setHexMock = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Palette  colors={mockColors}
                setHex={setHexMock}/>
    )
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleKeydown(event)', () => {

    it.skip('should be invoked on any key press', () => {
      const mockSpy = jest.spyOn(wrapper.instance(), 'handleKeydown');

      wrapper.simulate('keydown', mockEvent);

      expect(mockSpy).toHaveBeenCalledWith(mockEvent);
    })

    it('should invoke generatePalette on space key press', () => {
      // const mockEvent = { keyCode: 32 };
      const mockSpy = jest.spyOn(wrapper.instance(), 'generatePalette');

      wrapper.instance().handleKeydown(mockEvent);

      expect(mockSpy).toHaveBeenCalled();
    })

  })

  describe('generatePalette()', () => {

    it('should invoke generateBaseColor', () => {
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

  })

})