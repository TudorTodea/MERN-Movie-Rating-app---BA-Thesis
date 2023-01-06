/* eslint-disable */
import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from './store/auth-context';

import './Auth.css';

const AuthForm = () => {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const usernameInputRef = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = 'http://localhost:5000/api/auth/login';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = 'Authentication failed!';

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          const expirationTime = new Date(
            new Date().getTime() + +'3600' * 1000
          );
          authCtx.login(
            data.token,
            expirationTime.toISOString(),
            data.username,
            data.id
          );
          navigate('/', { replace: true });
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      const enteredUsername = usernameInputRef.current.value;
      url = 'http://localhost:5000/api/auth/register';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: enteredEmail,
          password: enteredPassword,
          username: enteredUsername,
          returnSecureToken: true,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          setIsLoading(false);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = 'Authentication failed!';

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          const expirationTime = new Date(
            new Date().getTime() + +'3600' * 1000
          );
          authCtx.login(
            data.token,
            expirationTime.toISOString(),
            data.username,
            data.id
          );
          navigate('/', { replace: true });
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <section>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form onSubmit={submitHandler} className="form1">
        <h3>{isLogin ? 'Login' : 'Sign Up'}</h3>
        <div>
          <label className="label1" htmlFor="email">
            Your Email
          </label>
          <input
            className="input1"
            type="email"
            id="email"
            required
            ref={emailInputRef}
          />
        </div>
        <div>
          <label className="label1" htmlFor="password">
            Your Password
          </label>
          <input
            className="input1"
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin ? (
          <div>
            <label className="label1" htmlFor="text">
              Your Username
            </label>
            <input
              className="input1"
              type="text"
              id="user"
              required
              ref={usernameInputRef}
            />
          </div>
        ) : null}
        <div>
          {!isLoading && (
            <button className="button2">
              {isLogin ? 'Login' : 'Create Account'}
            </button>
          )}
          {isLoading && <p>Sending request...</p>}

          <a type="button" href='#' className="buttont" onClick={switchAuthModeHandler}>
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </a>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
