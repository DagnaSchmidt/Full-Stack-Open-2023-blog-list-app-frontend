import React, {useState} from 'react';
import { update, getAll } from '../services/blogs';

const Blog = ({blog, setBlogs}) => {
  const [details, setDetails] = useState(false);
  const {id, title, url, likes, user} = blog;

  const blogStyle = {
    padding: 8,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const handleUpdateBlog = async (id) => {
    await update(id);
    getAll().then(blogs => setBlogs(blogs.reverse()));
  };

  return (
    <div style={blogStyle}>
      <p>{title}</p>
      {details &&
        <div>
          <p>{url}</p>
          <p>{likes}</p>
          <button onClick={() => handleUpdateBlog(id)}>add</button>
          <p>{user && user.username}</p>
        </div>
      }
      <button onClick={() => setDetails(!details)}>{details ? 'hide' : 'view'} details</button>
    </div>
  )
}

export default Blog