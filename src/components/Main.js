import React from 'react';
import AddNewBlogForm from './AddNewBlogForm.js';
import BlogsList from './BlogsList.js';
import { blogContainer, blogTitleContainer } from '../styles/styles.js';

const Main = () => {
  return (
    <div style={blogContainer}>
        <h2 style={blogTitleContainer}>Blogs</h2>
        <AddNewBlogForm />
        <div style={blogContainer}>
          <h3>List of blogs:</h3>
          <BlogsList />
        </div>
    </div>
  );
};

export default Main;