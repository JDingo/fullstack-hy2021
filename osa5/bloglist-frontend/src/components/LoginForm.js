import React from 'react'

const LoginForm = ({ handleLogin, username, handleUsernameChange, password, handlePasswordChange }) => {
    return (
        <div>
            <h2>Log in to the application</h2>
            {<form onSubmit={handleLogin}>
                <div>
                    Username
                    <input
                        id="username"
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    />
                </div>
                <div>
                    Password
                    <input
                        id="password"
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id="loginButton" type="submit">login</button>
            </form>}
        </div>
    )
}

export default LoginForm