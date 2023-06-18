import React from 'react';
import { Link } from 'react-router-dom';
import { blogContainer, blogTitleContainer, linkStyle } from '../styles/styles.js';

const User = ({displayedUser}) => {
    console.log(displayedUser);
  return (
    <div style={blogContainer}>
        <h2 style={blogTitleContainer}>{displayedUser.username}</h2>
        <h3>added blogs</h3>
        <ul style={{listStyleType: 'none'}}>
            {displayedUser.blogs.map(i => <li style={linkStyle}><Link to={`/blogs/${i.id}`} >{i.title}</Link></li>)}
        </ul>
    </div>
  );
};

export default User;