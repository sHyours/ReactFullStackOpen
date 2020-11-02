import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Creat from './components/Creat'
import Login from './components/Login'
import blogService from './services/blogs'
import './App.css'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState(null);

  const newBlogRef = useRef();

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, []);
  const handleNewBlog = (blog) => {
    setBlogs(blogs.concat(blog));
    setInfo({
      type: 'info',
      message: `a new blog ${blog.title} by ${blog.author}`
    });
    setTimeout(() => {
      setInfo(null);
    }, 5000);
    newBlogRef.current.toggleVisibility();
  };
  const handleLike = (newblog) => {
    console.log(newblog);
    setBlogs(blogs.map(blog => {
      return blog.id === newblog.id ? newblog : blog;
    }));
    setInfo({
      type: 'info',
      message: `the blog ${newblog.title} updated by ${newblog.author}`
    });
    setTimeout(() => {
      setInfo(null);
    }, 5000);
  };
  const handleDel = (deletedBlog) => {
    console.log(deletedBlog);
    setBlogs(blogs.filter(blog => {
      return blog.id !== deletedBlog.id;
    }));
    setInfo({
      type: 'info',
      message: `the blog ${deletedBlog.title} del by ${deletedBlog.author}`
    });
    setTimeout(() => {
      setInfo(null);
    }, 5000);
  };
  const loginForm = () => <Login user={user} setUser={setUser} setInfo={setInfo}></Login>

  const blogForm = (user) => {
    return (
      <div>
        <Togglable buttonLabel='new blog' ref={newBlogRef}>
          <Creat newBlog={handleNewBlog}></Creat>
        </Togglable>
        {
          blogs.sort((a, b) => a.likes - b.likes).map(blog => <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDel={handleDel}></Blog>)
        }
      </div>
    )
  }
  return (
    <div>
      {
        info === null ? '' :
          <p className={info.type}>{info.message}</p>
      }
      <h2>Blog list</h2>
      {loginForm()}
      {
        user === null ? '' : blogForm()
      }
    </div >
  )
}

export default App