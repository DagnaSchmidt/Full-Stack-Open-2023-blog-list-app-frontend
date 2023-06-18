import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { showSuccessMessage } from '../reducers/notificationReducer.js';
import { deleteBlog, voteOnBlog } from '../reducers/blogsReducer.js';

const Blog = ({displayedBlog}) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const {id, title, url, likes, author } = displayedBlog;

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
    dispatch(voteOnBlog(id));
    dispatch(showSuccessMessage(`you voted on ${title}`));
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm(`Do you really want to delete ${title}?`)) {
      dispatch(deleteBlog(id));
      dispatch(showSuccessMessage(`you deleted ${title}`));
    }
  };

  return (
    <div style={blogStyle} className='blog'>
      <div style={titleWithBtnStyle}>
        <p className='title'>{title}</p><p>{author}</p>
      </div>
        <div>
          <p>URL: {url}</p>
          <div style={titleWithBtnStyle}>
            <p id='likes'>Votes: {likes}</p>
            <button className='addBtn' id='addBtn' onClick={() => handleUpdateBlog(id)}>add vote</button>
          </div>
          <p>Author of post: {displayedBlog.user.username}</p>
          {user.username === displayedBlog.user.username &&
            <button id='deleteBtn' onClick={() => handleDeleteBlog(id)}>remove blog</button>
          }
        </div>
    </div>
  );
};

export default Blog;

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};