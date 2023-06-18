import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showSuccessMessage } from '../reducers/notificationReducer.js';
import { addComment, deleteBlog, initializeBlogs, voteOnBlog } from '../reducers/blogsReducer.js';
import { useNavigate } from 'react-router-dom';

const Blog = ({displayedBlog}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(displayedBlog);

  const user = useSelector(state => state.user);
  const {id, title, url, likes, author, comments } = displayedBlog;

  const [content, setContent] = useState('');

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
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = {content: content};

    dispatch(addComment(id, comment));
    dispatch(initializeBlogs());
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
          <h3>Comments:</h3>
          <p>add comment:</p>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              value={content}
              name='content'
              placeholder='comment here...'
              id='content'
              onChange={({target}) => setContent(target.value)}
            />
            <button>add</button>
          </form>
          <ul>
            {comments.length !== 0 &&
              comments.map(i => <li key={i.content}>{i.content}</li>)
            }
          </ul>
          {user.username === displayedBlog.user.username &&
            <button id='deleteBtn' onClick={() => handleDeleteBlog(id)}>remove blog</button>
          }
        </div>
    </div>
  );
};

export default Blog;