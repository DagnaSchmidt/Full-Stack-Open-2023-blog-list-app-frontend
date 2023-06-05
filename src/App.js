import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { getAll, setToken, create, update } from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAll().then(blogs => setBlogs(blogs));

    const loggedUser = window.localStorage.getItem('loggedUser');
    if(loggedUser){
      const newUser = JSON.parse(loggedUser);
      setUser(newUser);
      setToken(newUser.token);
    }
    // eslint-disable-next-line
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({username, password});
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    }
    catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {setErrorMessage(null)}, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  return (
    <div>
      <div>{errorMessage}</div>
        {user ?
          <>
            <h2>blogs</h2>
            <div><h5>{user.username} logged in</h5><button onClick={() => handleLogout()}>log out</button></div>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
          </>
        :
          <>
            <h2>login</h2>
            <form onSubmit={handleLogin}>
              <div>
                <label>username</label>
                <input
                  type='text'
                  value={username}
                  name='username'
                  onChange={({target}) => setUsername(target.value)}
                />
              </div>
              <div>
                <label>password</label>
                <input
                  type='password'
                  value={password}
                  name='password'
                  onChange={({target}) => setPassword(target.value)}
                />
              </div>
              <button>login</button>
            </form>
          </>
        }
    </div>
  )
};

export default App;