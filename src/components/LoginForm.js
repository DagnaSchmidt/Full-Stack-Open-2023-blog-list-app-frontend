import React from 'react'

const LoginForm = ({handleLogin, username, setUsername, password, setPassword}) => {
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
                  onChange={({target}) => setUsername(target.value)}
                />
              </div>
              <div>
                <label>password</label>
                <input
                  type='password'
                  value={password}
                  name='password'
                  onChange={({target}) => setPassword(target.value)}
                />
              </div>
              <button>login</button>
            </form>
        </>
  )
}

export default LoginForm;