import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { NavInfo } from './NavInfo';

describe('NavInfo', () => {

  let projectsMock = [
    { 
      title: "Test Project", 
      id: 73, 
      palettes: [
        {
          color1: "#7DBB54",
          color2: "#569963",
          color3: "#486A60",
          color4: "#455154",
          color5: "#313235",
          id: 63,
          name: "Test Palette",
          project_id: 73
        }
      ] 
    }
  ];
  let handleDeleteMock = jest.fn();
  let handlePatchMock = jest.fn();
  let setHexMock = jest.fn();

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <NavInfo  projects={projectsMock}
                handleDelete={handleDeleteMock}
                handlePatch={handlePatchMock}
                setHex={setHexMock} />
    )
  })

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  it.skip('should invoke mapProjectInfo on mount', () => {
    const mockSpy = jest.spyOn(wrapper.instance(), 'mapProjectInfo');

    wrapper.update();

    expect(mockSpy).toHaveBeenCalled();
  })

  describe('mapProjectInfo()', () => {

    it('should return JSX', () => {
      let results = wrapper.instance().mapProjectInfo();

      expect(results).toMatchSnapshot();
    })

    it('should invoke mapPaletteInfo', () => {
      const mockSpy = jest.spyOn(wrapper.instance(), 'mapPaletteInfo');

      wrapper.instance().mapProjectInfo();

      expect(mockSpy).toHaveBeenCalled();
    })

  })

  describe('mapPaletteInfo()', () => {

    it('should return JSX', () => {
      let results = wrapper.instance().mapPaletteInfo(projectsMock[0]);

      expect(results).toMatchSnapshot();
    })

  })

})