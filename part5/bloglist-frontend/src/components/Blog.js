import React, { useState, useEffect } from 'react';
const Blog = ({ blog, handleLike, handleDel }) => {
  const [visible, setVisible] = useState(false);
  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
    }
  }, []);
  const toggleVisibility = () => {
    setVisible(!visible);
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  // console.log(user);
  // console.log(blog);
  const removeButtonStyle = {
    display: user && blog.user && user.id === blog.user.id ? '' : 'none',
    backgroundColor: 'blueviolet'
  };
  const like = async (blog) => {
    console.log('like');
    handleLike(blog);
  };
  const deleteBlog = async (blog) => {
    console.log('click');
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      handleDel(blog);
    }
  };
  return (
    <div style={blogStyle}>
      {blog.title} <span style={hideWhenVisible}>{blog.author}</span>
      <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      <div style={showWhenVisible} className='detail'>
        <p>url:{blog.url}</p>
        <span>likes:{blog.likes}</span> <button onClick={() => like(blog)}>like</button>
        <p>author:{blog.author}</p>
        <button style={removeButtonStyle} onClick={() => deleteBlog(blog)}>remove</button>
      </div>
    </div>
  );
};
export default Blog;
