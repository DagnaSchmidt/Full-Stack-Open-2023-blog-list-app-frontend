import { useState, useEffect } from 'react';
import Blog from './components/Blog.js';
import { getAll, setToken } from './services/blogs.js';
import LoginForm from './components/LoginForm.js';
import AddNewBlogForm from './components/AddNewBlogForm.js';

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [blogs, setBlogs] = useState([]);

  const [user, setUser] = useState(null);

  const [addNewBlogToggle, setAddNewBlogToggle] = useState(false);

  useEffect(() => {
    getAll().then(blogs => setBlogs(blogs.reverse()));

    const loggedUser = window.localStorage.getItem('loggedUser');
      if(loggedUser){
        const newUser = JSON.parse(loggedUser);
        setUser(newUser);
        setToken(newUser.token);
      }
    // eslint-disable-next-line
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  return (
    <div>
      {errorMessage &&
          <div id='errorMessage' style={{padding: '6px', borderStyle: 'solid', borderWidth: '3px', borderColor: errorMessage.border}}>{errorMessage.title}</div>
      }
        {user ?
          <>
            <h2>user</h2>
            <div><h5>{user.username} logged in</h5><button onClick={() => handleLogout()}>log out</button></div>
            {addNewBlogToggle &&
                <AddNewBlogForm setErrorMessage={setErrorMessage} setBlogs={setBlogs} setAddNewBlogToggle={setAddNewBlogToggle} />
            }
            <button onClick={() => setAddNewBlogToggle(!addNewBlogToggle)}>{addNewBlogToggle ? 'cancel' : 'add new blog'}</button>
            <h2>blogs</h2>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} />)}
          </>
        :
          <LoginForm setToken={setToken} setUser={setUser} setErrorMessage={setErrorMessage} />
        }
    </div>
  );
};

export default App;