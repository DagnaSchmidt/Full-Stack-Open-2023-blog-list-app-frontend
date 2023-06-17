import React, {useState} from 'react';
import { update, getAll, remove } from '../services/blogs.js';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { showSuccessMessage } from '../reducers/notificationReducer.js';

const Blog = ({blog, setBlogs, user}) => {
  const dispatch = useDispatch();
  const [details, setDetails] = useState(false);
  const {id, title, url, likes, author } = blog;

  const blogStyle = {
    padding: 8,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const titleWithBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12
  };

  const handleUpdateBlog = async (id) => {
    await update(id);
    const allBlogs = await getAll();
    setBlogs(allBlogs.reverse());
    dispatch(showSuccessMessage(`you voted on ${title}`));
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm(`Do you really want to delete ${title}?`)) {
      await remove(id);
      const allBlogs = await getAll();
      setBlogs(allBlogs.reverse());
      dispatch(showSuccessMessage(`you deleted ${title}`));
    }
  };

  return (
    <div style={blogStyle} className='blog'>
      <div style={titleWithBtnStyle}>
        <p className='title'>{title}</p><p>{author}</p>
        <button className='detailsBtn' id='detailsBtn' onClick={() => setDetails(!details)}>{details ? 'hide' : 'view'} details</button>
      </div>
      {details &&
        <div>
          <p>URL: {url}</p>
          <div style={titleWithBtnStyle}>
            <p id='likes'>Votes: {likes}</p>
            <button className='addBtn' id='addBtn' onClick={() => handleUpdateBlog(id)}>add vote</button>
          </div>
          <p>Author of post: {blog.user.username}</p>
          {user.username === blog.user.username &&
            <button id='deleteBtn' onClick={() => handleDeleteBlog(id)}>remove blog</button>
          }
        </div>
      }
    </div>
  );
};

export default Blog;

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};