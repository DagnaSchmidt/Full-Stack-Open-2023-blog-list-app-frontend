import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const BlogsList = () => {
    const blogs = useSelector(state => state.blogs);

  return (
    <ul>
        {blogs.map(i => <li><Link to={`/blogs/${i.id}`} >{i.title}</Link></li>)}
    </ul>
  );
};

export default BlogsList;