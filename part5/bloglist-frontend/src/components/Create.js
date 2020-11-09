import React, { useState } from 'react';
const Creat = ({ newBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleCreate = async (e) => {
    e.preventDefault();
    const blog = {
      title, url, author
    };
    newBlog(blog);
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <div>
      <form onSubmit={handleCreate} id="create_form">
        title: <input id='text' name='title' type="text" value={title} onChange={({ target }) => { setTitle(target.value); }} />
        <br></br>
        author: <input id='author' name='author' type="text" value={author} onChange={({ target }) => { setAuthor(target.value); }} />
        <br></br>
        url: <input id='url' name='url' type="text" value={url} onChange={({ target }) => { setUrl(target.value); }} />
        <br></br>
        <button id="submit" type="submit">create</button>
      </form>
    </div>
  );
};
export default Creat;