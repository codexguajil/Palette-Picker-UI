import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './Header';
import { shallow } from 'enzyme';

describe('Header', () => {

  let wrapper;
  let activeNavMock = true;
  let toggleNavMock = jest.fn()

  beforeEach(() => {
    wrapper = shallow(
      <Header activeNav={activeNavMock}
              toggleNav={toggleNavMock} />
    )
  })

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should return "label flipped" if activeNav prop is true', () => {
    let labelClass = wrapper.instance().labelClassBuilder(true);
    expect(labelClass).toEqual('label flipped');
  })

  it('should return "label " if activeNav prop is false', () => {
    let labelClass = wrapper.instance().labelClassBuilder(false);
    expect(labelClass).toEqual('label ');
  })

})