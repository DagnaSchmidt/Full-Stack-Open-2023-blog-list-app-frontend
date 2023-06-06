import React, {useState} from 'react';
import { update, getAll, remove } from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({blog, setBlogs, user}) => {
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
  }

  const handleUpdateBlog = async (id) => {
    await update(id);
    const allBlogs = await getAll();
    setBlogs(allBlogs.reverse());
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm(`Do you really want to delete ${title}?`)) {
      await remove(id);
      const allBlogs = await getAll();
      setBlogs(allBlogs.reverse());
    }
  }

  return (
    <div style={blogStyle}>
      <div style={titleWithBtnStyle}>
        <p>{title}</p>
        <button onClick={() => setDetails(!details)}>{details ? 'hide' : 'view'} details</button>
      </div>
      {details &&
        <div>
          <p>{author}</p>
          <p>{url}</p>
          <div style={titleWithBtnStyle}>
            <p>{likes}</p>
            <button onClick={() => handleUpdateBlog(id)}>add</button>
          </div>
          <p>{blog.user && blog.user.username}</p>
          {blog.user && user.name === blog.user.name &&
            <button onClick={() => handleDeleteBlog(id)}>remove blog</button>
          }
        </div>
      }
    </div>
  )
}

export default Blog;

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}