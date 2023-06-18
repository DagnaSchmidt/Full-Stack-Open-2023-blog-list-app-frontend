import React from 'react';

const User = ({displayedUser}) => {
    console.log(displayedUser);
  return (
    <div>
        <h2>{displayedUser.username}</h2>
        <h5>added blogs</h5>
        <ul>
            {displayedUser.blogs.map(i => <li>{i.title}</li>)}
        </ul>
    </div>
  );
};

export default User;