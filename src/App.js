import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({username, password});
      console.log(user);
      setUser(user);
      setUsername('');
      setPassword('');
    }
    catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {setErrorMessage(null)}, 5000);
    }
  }

  return (
    <div>
      <div>{errorMessage}</div>
        {user ?
          <>
            <h2>blogs</h2>
            <h5> logged in</h5>
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
                  type='text'
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