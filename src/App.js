import { useState, useEffect } from 'react';
import Blog from './components/Blog.js';
import LoginForm from './components/LoginForm.js';
import AddNewBlogForm from './components/AddNewBlogForm.js';
import Notification from './components/Notification.js';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer.js';
import { removeUser } from './reducers/userReducer.js';

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(state => state.blogs);
  console.log(blogs);

  const user = useSelector(state => state.user);
  console.log(user);

  const [addNewBlogToggle, setAddNewBlogToggle] = useState(false);

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(removeUser());
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
          <LoginForm />
        }
    </div>
  );
};

export default App;