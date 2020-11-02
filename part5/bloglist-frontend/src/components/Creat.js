import React, { useState } from 'react';
import blogs from '../services/blogs';
const Creat = ({ newBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleCreate = async (e) => {
    e.preventDefault();
    const blog = await blogs.create({
      title, url, author
    });
    newBlog(blog);
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <>
      title: <input name='title' type="text" value={title} onChange={({ target }) => { setTitle(target.value); }} />
      <br></br>
      author: <input name='author' type="text" value={author} onChange={({ target }) => { setAuthor(target.value); }} />
      <br></br>
      url: <input name='url' type="text" value={url} onChange={({ target }) => { setUrl(target.value); }} />
      <br></br>
      <button onClick={handleCreate}>create</button>
    </>
  );
};
export default Creat;