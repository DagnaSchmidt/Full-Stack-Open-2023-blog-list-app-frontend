import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { getAll, setToken, create, update } from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    getAll().then(blogs => setBlogs(blogs));

    const loggedUser = window.localStorage.getItem('loggedUser');
      if(loggedUser){
        const newUser = JSON.parse(loggedUser);
        setUser(newUser);
        setToken(newUser.token);
      };
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
      setErrorMessage({title: 'user successfully logged in', border: 'green'});
      setTimeout(() => {setErrorMessage(null)}, 5000);
    }
    catch (exception) {
      setErrorMessage({title: 'Wrong credentials', border: 'red'});
      setTimeout(() => {setErrorMessage(null)}, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    const newBlog = {
      title: title,
      author: author,
      url: url
    };
    try {
      const addedBlog = await create(newBlog);
      setErrorMessage({title: `a new blog: ${title} successfully added!`, border: 'green'});
      setTimeout(() => {setErrorMessage(null)}, 5000);
      const allBlogs = await getAll();
      setBlogs(allBlogs);
    }
    catch (exception) {
      setErrorMessage({title: 'failed to add blog', border: 'red'});
      setTimeout(() => {setErrorMessage(null)}, 5000);
    }
  }

  return (
    <div>
      {errorMessage &&
          <div style={{padding: '6px',borderStyle: 'solid', borderWidth: '3px', borderColor: errorMessage.border}}>{errorMessage.title}</div>
      }
        {user ?
          <>
            <h2>user</h2>
            <div><h5>{user.username} logged in</h5><button onClick={() => handleLogout()}>log out</button></div>
            <h2>add new blog</h2>
            <form onSubmit={handleCreateBlog}>
              <label>Title</label>
                <input
                  type='text'
                  value={title}
                  name='title'
                  onChange={({target}) => setTitle(target.value)}
                />
              <label>Author</label>
                <input
                  type='text'
                  value={author}
                  name='author'
                  onChange={({target}) => setAuthor(target.value)}
                />
              <label>URL</label>
                <input
                  type='text'
                  value={url}
                  name='url'
                  onChange={({target}) => setUrl(target.value)}
                />
                <button>add</button>
            </form>
            <h2>blogs</h2>
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