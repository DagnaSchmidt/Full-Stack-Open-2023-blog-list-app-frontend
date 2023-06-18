import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { linkStyle } from '../styles/styles.js';

const BlogsList = () => {
    const blogs = useSelector(state => state.blogs);

  return (
    <ul style={{listStyleType: 'none'}}>
        {blogs.map(i => <li style={linkStyle} key={i.id}><Link to={`/blogs/${i.id}`}>{i.title}</Link></li>)}
    </ul>
  );
};

export default BlogsList;