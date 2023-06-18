import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
  const users = useSelector(state => state.users);
  console.log(users);

  const UserLink = ({username, blogs, id}) => {
    return (
      <>
        <Link to ={`/users/${id}`}>{username}</Link>
        <p>{blogs.length}</p>
      </>
    );
  };

  return (
    <div>
      <h2>Users</h2>
      <div>
        {users.map(i => <UserLink key={i.id} {...i} />)}
      </div>
    </div>
  );
};

export default Users;