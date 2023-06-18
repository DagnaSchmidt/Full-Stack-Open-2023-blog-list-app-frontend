import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { showSuccessMessage, showErrorMessage } from '../reducers/notificationReducer.js';
import { saveUser } from '../reducers/userReducer.js';
import { useNavigate } from 'react-router-dom';
import { addBtn, blogContainer, inputContainer } from '../styles/styles.js';

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          dispatch(saveUser({username, password}));
          setUsername('');
          setPassword('');
          dispatch(showSuccessMessage(`user ${username} successfully logged in`));
          navigate('/');
        }
        catch (exception) {
          dispatch(showErrorMessage('wrong credentials'));
        }
      };

  return (
        <div style={blogContainer}>
            <h2>login</h2>
            <form onSubmit={handleLogin}>
              <div style={inputContainer}>
                <label>username</label>
                <input
                  type='text'
                  value={username}
                  name='username'
                  id='username'
                  onChange={({target}) => setUsername(target.value)}
                />
              </div>
              <div style={inputContainer}>
                <label>password</label>
                <input
                  type='password'
                  value={password}
                  name='password'
                  id='password'
                  onChange={({target}) => setPassword(target.value)}
                />
              </div>
              <button style={addBtn} id='loginBtn'>login</button>
            </form>
        </div>
  );
};

export default LoginForm;