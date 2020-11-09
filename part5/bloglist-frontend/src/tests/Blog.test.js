import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { fireEvent, render } from '@testing-library/react';
import Blog from '../components/Blog';

describe('<Blog/>', () => {
  let component;
  const mockHandlerLike = jest.fn();
  const mockHandlerDel = jest.fn();
  beforeEach(() => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: '0',
      users: '',
    };
    component = render(
      <Blog blog={blog} handleLike={mockHandlerLike} handleDel={mockHandlerDel}></Blog>
    );
  });
  test('renders blog', () => {
    expect(component.container).toHaveTextContent(
      'title'
    );
  });
  test('should detail hide', () => {
    const detail = component.container.querySelector('.detail');
    expect(detail).toHaveStyle('display: none');
  });
  test('should the detail be showed ', () => {
    const button = component.getByText('view');
    fireEvent.click(button);
    const detail = component.container.querySelector('.detail');
    expect(detail).toHaveStyle('display: block');
  });
  test('should the detail be showed ', () => {
    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandlerLike.mock.calls).toHaveLength(2);
  });
});