import React from 'react';
import ReactDOM from 'react-dom';
import { Color } from './Color';
import { shallow } from 'enzyme';

describe('Color', () => {

  let wrapper;
  let mockHex = '#FFFFFF';
  let mockLocked = false;
  let mockToggleLocked = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <Color  hex={mockHex} 
              locked={mockLocked} 
              toggleLocked={mockToggleLocked}/>
    )
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should invoke toggleLocked prop on click', () => {    
    wrapper.find('.Color').simulate('mouseDown');

    expect(mockToggleLocked).toHaveBeenCalledWith(mockHex);
  })

  describe('determineLightLevel(hex)', () => {

    it('should invoke determineLightLevel on component mount', () => {
      const mockSpy = jest.spyOn(wrapper.instance(), 'determineLightLevel');

      wrapper.instance().determineLightLevel(mockHex);

      expect(mockSpy).toHaveBeenCalledWith(mockHex);
    })

    it('should return a false boolean when hex parameter is light', () => {
      mockHex = '#FFFFFF'; // white

      const determineLightLevelResult = wrapper.instance().determineLightLevel(mockHex);

      expect(determineLightLevelResult).toEqual(false);
    })

    it('should return a true boolean when hex parameter is dark', () => {
      mockHex = '#000000'; // black

      const determineLightLevelResult = wrapper.instance().determineLightLevel(mockHex);

      expect(determineLightLevelResult).toEqual(true);
    })

  })

  describe('hexToName(hex)', () => {

    it('should invoke hexToName on component mount', () => {
      const mockSpy = jest.spyOn(wrapper.instance(), 'hexToName');

      wrapper.instance().hexToName(mockHex);

      expect(mockSpy).toHaveBeenCalledWith(mockHex);
    })

    it('should return a string based on the hex parameter', () => {
      const hexToNameResult = wrapper.instance().hexToName('#249DE2');

      expect(hexToNameResult).toEqual('Curious Blue'); 
    })

  })

})