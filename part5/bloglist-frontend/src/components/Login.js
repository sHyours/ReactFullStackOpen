import React, { useState } from 'react';
import blogs from '../services/blogs';
import login from '../services/login';

const Login = ({ user, setUser, setInfo }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(username, password);
    try {
      const user = await login(username, password);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      blogs.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (error) {
      setInfo({
        type: 'warning',
        message: 'wrong username or password',
      });
      setTimeout(() => {
        setInfo(null);
      }, 5000);
    }
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem('loggedUser');
    setUser(null);
    blogs.setToken('');
  };
  if (user) {
    return (
      <div>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </div>
    );
  }
  return (
    <div>
      <form action="" onSubmit={handleLogin}>
        <div>
          <input type="text" className="" value={username} name="Username" onChange={({ target }) => {
            setUsername(target.value);
          }} />
        </div>
        <div>
          <input type="text" className="" value={password} name="Password" onChange={({ target }) => {
            setPassword(target.value);
          }} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};
export default Login;
