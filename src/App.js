import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import { getAll, setToken, create, update } from './services/blogs';
import LoginForm from './components/LoginForm';
import AddNewBlogForm from './components/AddNewBlogForm';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [addNewBlogToggle, setAddNewBlogToggle] = useState(false);

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
            {addNewBlogToggle &&
                <AddNewBlogForm handleCreateBlog={handleCreateBlog} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} />
            }
            <button onClick={() => setAddNewBlogToggle(!addNewBlogToggle)}>{addNewBlogToggle ? 'cancel' : 'add new blog'}</button>
            <h2>blogs</h2>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
          </>
        :
          <LoginForm setToken={setToken} setUser={setUser} setErrorMessage={setErrorMessage} />
        }
    </div>
  )
};

export default App;