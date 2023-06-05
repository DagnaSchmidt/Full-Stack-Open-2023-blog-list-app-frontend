import React, {useState} from 'react'

const Blog = ({blog}) => {
  const [details, setDetails] = useState(false);

  const blogStyle = {
    padding: 8,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title}</p>
      {details &&
        <div>
          <p>{blog.url}</p>
          <p>{blog.likes}</p>
          <button>add</button>
          <p>{blog.user && blog.user.username}</p>
        </div>
      }
      <button onClick={() => setDetails(!details)}>{details ? 'hide' : 'view'} details</button>
    </div>
  )
}

export default Blog