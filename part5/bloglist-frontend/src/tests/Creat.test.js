import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import Create from '../components/Create';
import { fireEvent, render } from '@testing-library/react';

describe('<Create/>', () => {
  let component;
  const mockHandler = jest.fn();
  beforeEach(() => {
    component = render(
      <Create newBlog={mockHandler}></Create>
    );
  });
  test('should create with fn', () => {
    const create = component.getByText('create');
    fireEvent.click(create);
    expect(mockHandler.mock.calls).toHaveLength(1);
  });
});