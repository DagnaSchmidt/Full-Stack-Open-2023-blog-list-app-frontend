import React, {useState} from 'react';
import {login} from '../services/login.js';
import { useDispatch } from 'react-redux';
import { showSuccessMessage, showErrorMessage } from '../reducers/notificationReducer.js';

const LoginForm = ({setToken, setUser}) => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          const user = await login({username, password});
          window.localStorage.setItem('loggedUser', JSON.stringify(user));
          setToken(user.token);
          setUser(user);
          setUsername('');
          setPassword('');
          dispatch(showSuccessMessage(`user ${username} successfully logged in`));
        }
        catch (exception) {
          dispatch(showErrorMessage('wrong credentials'));
        }
      };

  return (
        <>
            <h2>login</h2>
            <form onSubmit={handleLogin}>
              <div>
                <label>username</label>
                <input
                  type='text'
                  value={username}
                  name='username'
                  id='username'
                  onChange={({target}) => setUsername(target.value)}
                />
              </div>
              <div>
                <label>password</label>
                <input
                  type='password'
                  value={password}
                  name='password'
                  id='password'
                  onChange={({target}) => setPassword(target.value)}
                />
              </div>
              <button id='loginBtn'>login</button>
            </form>
        </>
  );
};

export default LoginForm;