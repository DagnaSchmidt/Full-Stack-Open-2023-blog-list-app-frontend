import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { blogContainer, blogTitleContainer, userLinkStyle } from '../styles/styles.js';

const Users = () => {
  const users = useSelector(state => state.users);
  console.log(users);

  const UserLink = ({username, blogs, id}) => {
    return (
      <div style={userLinkStyle}>
        <Link to ={`/users/${id}`}>{username}</Link>
        <p>{blogs.length}</p>
      </div>
    );
  };

  return (
    <div style={blogContainer}>
      <h2 style={blogTitleContainer}>Users</h2>
      <div style={{width: '40vw'}}>
        <p style={{display: 'flex', justifyContent: 'flex-end'}}>created blogs</p>
        {users.map(i => <UserLink key={i.id} {...i} />)}
      </div>
    </div>
  );
};

export default Users;