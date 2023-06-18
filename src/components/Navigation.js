import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from '../reducers/userReducer.js';
import { nav, navLink, titleWithBtnStyle } from '../styles/styles.js';

const Navigation = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(removeUser());
        navigate('/login');
    };

    if(user === null){
        return null;
    }else{
        return (
            <div style={nav}>
                <div style={titleWithBtnStyle}>
                    <Link style={navLink} to='/'>blogs</Link>
                    <Link style={navLink} to='/users'>users</Link>
                </div>
                <div style={titleWithBtnStyle}>
                    <h5>{user.username} logged in</h5>
                    <button id='logoutBtn' onClick={() => handleLogout()}>log out</button>
                </div>
            </div>
          );
    }
};

export default Navigation;