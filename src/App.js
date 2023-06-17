import { useState, useEffect } from 'react';
import Blog from './components/Blog.js';
import { setToken } from './services/blogs.js';
import LoginForm from './components/LoginForm.js';
import AddNewBlogForm from './components/AddNewBlogForm.js';
import Notification from './components/Notification.js';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer.js';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  console.log(blogs);

  const [user, setUser] = useState(null);
  console.log(user);

  const [addNewBlogToggle, setAddNewBlogToggle] = useState(false);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {

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
      <Notification />
        {user ?
          <>
            <h2>user</h2>
            <div><h5>{user.username} logged in</h5><button id='logoutBtn' onClick={() => handleLogout()}>log out</button></div>
            {addNewBlogToggle &&
                <AddNewBlogForm setAddNewBlogToggle={setAddNewBlogToggle} />
            }
            <button onClick={() => setAddNewBlogToggle(!addNewBlogToggle)}>{addNewBlogToggle ? 'cancel' : 'add new blog'}</button>
            <h2>blogs</h2>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} user={user} />)}
          </>
        :
          <LoginForm setToken={setToken} setUser={setUser} />
        }
    </div>
  );
};

export default App;