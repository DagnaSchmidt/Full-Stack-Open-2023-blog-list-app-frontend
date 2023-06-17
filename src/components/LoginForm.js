import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { showSuccessMessage, showErrorMessage } from '../reducers/notificationReducer.js';
import { saveUser } from '../reducers/userReducer.js';

const LoginForm = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          dispatch(saveUser({username, password}));
          // const user = await login({username, password});
          // window.localStorage.setItem('loggedUser', JSON.stringify(user));
          // setToken(user.token);
          // setUser(user);
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