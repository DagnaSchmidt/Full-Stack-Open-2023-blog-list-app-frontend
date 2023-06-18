import React from 'react';
import { Link } from 'react-router-dom';

const User = ({displayedUser}) => {
    console.log(displayedUser);
  return (
    <div>
        <h2>{displayedUser.username}</h2>
        <h5>added blogs</h5>
        <ul>
            {displayedUser.blogs.map(i => <li><Link to={`/blogs/${i.id}`} >{i.title}</Link></li>)}
        </ul>
    </div>
  );
};

export default User;