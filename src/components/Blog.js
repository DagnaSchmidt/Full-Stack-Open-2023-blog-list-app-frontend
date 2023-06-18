import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showSuccessMessage } from '../reducers/notificationReducer.js';
import { addComment, deleteBlog, initializeBlogs, voteOnBlog } from '../reducers/blogsReducer.js';
import { useNavigate } from 'react-router-dom';
import { blogTitleContainer, blogTitle, blogContainer, titleWithBtnStyle, propStyle, deleteBtn, addBtn } from '../styles/styles.js';

const Blog = ({displayedBlog}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(displayedBlog);

  const user = useSelector(state => state.user);
  const {id, title, url, likes, author, comments } = displayedBlog;

  const [content, setContent] = useState('');

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
    <div style={blogContainer} className='blog'>
      <div style={blogTitleContainer}>
        <p style={blogTitle}>{title}</p><p>/ {author}</p>
      </div>
        <div>
          <div style={titleWithBtnStyle}>
            <p style={propStyle}>URL: </p><p>{url}</p>
          </div>
          <div style={titleWithBtnStyle}>
            <p id='likes' style={propStyle}>Votes: </p><p>{likes}</p>
            <button style={addBtn} className='addBtn' id='addBtn' onClick={() => handleUpdateBlog(id)}>add vote</button>
          </div>
          <div style={titleWithBtnStyle}>
            <p style={propStyle}>Author of post: </p><p>{displayedBlog.user.username}</p>
          </div>
          <div style={blogContainer}>
            <h3 style={blogTitleContainer}>Comments</h3>
            <div style={titleWithBtnStyle}>
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
            </div>
            <ul>
              {comments.length !== 0 &&
                comments.map(i => <li key={i.content}>{i.content}</li>)
              }
            </ul>
          </div>
          {user.username === displayedBlog.user.username &&
            <button style={deleteBtn} id='deleteBtn' onClick={() => handleDeleteBlog(id)}>remove blog</button>
          }
        </div>
    </div>
  );
};

export default Blog;