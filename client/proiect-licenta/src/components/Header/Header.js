import React, { useState, useRef } from 'react';
import './Header.css';
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css';
import SearchResults from '../Search/SearchResults';
import { HomeOutlined } from '@ant-design/icons';

function Header() {
  const navigate = useNavigate();
  const [searchContent, setSearchContent] = useState('');
  let variable = { userFrom: localStorage.getItem('userid') };
  const searchInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const searchHandler = (event) => {
    event.preventDefault();
    setSearchContent(searchInputRef.current.value);

    navigate('/search');
  };

  const logoutHandler = () => {
    authCtx.logout();
  };
  const profileHandler = () => {
    navigate(`/profile/${variable.userFrom}`);
  };
  const FavoriteHandler = () => {
    navigate(`/Favorite/${variable.userFrom}`);
  };
  const WatchlistHandler = () => {
    navigate(`/watchlist/${variable.userFrom}`);
  };
  const isLoggedIn = authCtx.isLoggedIn;

  return (
    <React.Fragment>
      <nav
        className="menu"
        style={{ position: 'relative', zIndex: 5, width: '100%' }}
      >
        <div className="wrapper">
          <div style={{ paddingTop: '15px' }} className="menu__logo">
            <HomeOutlined
              onClick={() => {
                navigate('/');
              }}
            />
          </div>
          <div className="menu__logo">
            <a style={{ color: 'white', fontWeight: 'bold' }} href="/Movies">
              Latest Movies
            </a>
          </div>
          <div className="menu__logo">
            <a
              style={{ color: 'white', fontWeight: 'bold' }}
              href="/upcoming"
            >
              Upcoming Movies
            </a>
          </div>
          <div className="menu__container">
            <div className="menu_left">
              <form onSubmit={searchHandler} className="search" action="">
                <input
                  className="inputsb"
                  type="search"
                  ref={searchInputRef}
                  placeholder="Search here..."
                  required
                />
                <button className="buttonssb" type="submit">
                  Search
                </button>
              </form>{' '}
            </div>
            <div className="menu_rigth">
              {!isLoggedIn && (
                <a href={`/auth`}>
                  <button className="buttont2">Login</button>
                </a>
              )}
              {isLoggedIn && (
                <button className="buttont2" onClick={WatchlistHandler}>
                  Watchlist
                </button>
              )}
              {isLoggedIn && (
                <button className="buttont2" onClick={FavoriteHandler}>
                  Favorites
                </button>
              )}
              {isLoggedIn && (
                <button className="buttont2" onClick={profileHandler}>
                  {localStorage.getItem('username')
                    ? localStorage.getItem('username')
                    : authCtx.username}
                </button>
              )}
              {isLoggedIn && (
                <button className="buttont2" onClick={logoutHandler}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      {searchContent && <SearchResults param={searchContent}></SearchResults>}
    </React.Fragment>
  );
}

export default Header;
