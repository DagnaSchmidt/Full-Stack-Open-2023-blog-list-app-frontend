import { useEffect } from 'react';
import LoginForm from './components/LoginForm.js';
import Notification from './components/Notification.js';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer.js';
import { Routes, Route, useNavigate, useMatch } from 'react-router-dom';
import Navigation from './components/Navigation.js';
import Main from './components/Main.js';
import Users from './components/Users.js';
import User from './components/User.js';
import Blog from './components/Blog.js';
import { getUsers } from './reducers/usersReducer.js';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogs = useSelector(state => state.blogs);
  console.log(blogs);

  const matchBlog = useMatch('blogs/:id');
  const displayedBlog = matchBlog ? blogs.find(i => i.id === matchBlog.params.id) : null;

  const user = useSelector(state => state.user);
  console.log(user);

  const users = useSelector(state => state.users);
  console.log(users);

  const match = useMatch('users/:id');
  const displayedUser = match ? users.find(i => i.id === match.params.id) : null;

  useEffect(() => {
    dispatch(initializeBlogs());
    if(user === null){
      navigate('/login');
    }
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <Notification />
        <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/users' element={<Users />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/users/:id' element={<User displayedUser={displayedUser} />} />
            <Route path='/blogs/:id' element={<Blog displayedBlog={displayedBlog}  />} />
        </Routes>
    </>
  );
};

export default App;