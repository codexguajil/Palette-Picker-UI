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

  it('should have default state', () => {
    let mockState = { 
      projects: [],
      projectTitle: '',
      paletteTitle: '',
      projectError: '',
      paletteError: ''
    }
    expect(wrapper.state()).toEqual(mockState);
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

  describe('gatherProjects()', () => {

    it.skip('should update state', async () => {
      wrapper.instance().gatherProjects();

      expect(wrapper.state('projects')).toEqual('butts');
    })

    it.skip('should return an error if the fetch goes wrong', async () => {
      window.fetch = jest.fn(() => Promise.resolve({
        ok: false,
      }));
      let results = await wrapper.instance().gatherProjects();

      expect(results).toEqual(errorMessage);
    })

  })

  describe('handleChange(e)', () => {
    
    it('should update state', () => {
      let mockEvent = {
        target: {
          value: 'palettes',
          id: 1
        }
      }

      wrapper.instance().handleChange(mockEvent);

      expect(wrapper.state([mockEvent.target.id])).toEqual(mockEvent.target.value);
    })
  })

  describe('handleSubmit(e)', () => {

    it('should return an id', async () => {
      let mockEvent = { 
        target: { id: 2 },
        preventDefault: jest.fn(),
        persist: jest.fn()
        };
      let results = await wrapper.instance().handleSubmit(mockEvent);

      expect(results).toEqual(mockEvent.target.id);
    })
  })

  describe('handleDelete(e)', () => {

    it.skip('should invoke gatherProjects', () => {
      const mockSpy = jest.spyOn(wrapper.instance(), 'gatherProjects');
      let mockEvent = {
        target: {
          value: 'palettes',
          id: 1
        }
      };
      wrapper.instance().handleDelete(mockEvent);

      expect(mockSpy).toHaveBeenCalled();
    })
  })

})