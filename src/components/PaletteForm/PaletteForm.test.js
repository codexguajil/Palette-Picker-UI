import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import { PaletteForm } from './PaletteForm';

describe('PaletteForm', () => {

  let wrapper;

  let handleSubmitMock = jest.fn();
  let handleChangeMock = jest.fn();
  let paletteTitleMock = '';
  let paletteErrorMock = '';
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

  beforeEach(() => {
    wrapper = shallow (
      <PaletteForm  handleSubmit={handleSubmitMock}
                    handleChange={handleChangeMock}
                    paletteTitle={paletteTitleMock}
                    paletteError={paletteErrorMock}
                    projects={projectsMock} />
    )
  })

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  })

  describe('mapProjectOptions()', () => {

    it('should return JSX', () => {
      let results = wrapper.instance().mapProjectOptions();

      expect(results).toMatchSnapshot();
    })
    
  })

})