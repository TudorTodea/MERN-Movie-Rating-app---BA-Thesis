import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './views/MainPage/MainPage';
import Movies from './views/Movies/Movies';
import MovieDetail from './views/Details/MovieDetail';
import Header from './components/Header/Header';
import Auth from './Auth';
import SearchResults from './components/Search/SearchResults';
import Profile from './views/profile/Profile';
import FavoritePage from './views/Favorite/FavoritePage';
import WatchlistPage from './views/Watchlist/WatchlistPage';
import UpcomingMovies from './views/UpcomingMovies/UpcomingMovies';
import Protected from './components/Protected';
import AuthContext from './store/auth-context';
import { useContext } from 'react';
import EditWatchlist from './views/Watchlist/EditWatchlist';
import EditFavorite from './views/Favorite/EditFavorite';
function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <React.Fragment>
      <Header></Header>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<MainPage />} />
        <Route exact path="/search/*" element={<SearchResults />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/upcoming" element={<UpcomingMovies />} />
        <Route path="/profile/:id" element={<Profile />} />

        <Route
          path="/edit/watchlist/:id"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <EditWatchlist />
            </Protected>
          }
        />
        <Route
          path="/edit/favorite/:id"
          element={
            <Protected isLoggedIn={isLoggedIn}>
              <EditFavorite />
            </Protected>
          }
        />
        <Route path="/favorite/:id" element={<FavoritePage />} />
        <Route path="/watchlist/:id" element={<WatchlistPage />} />
        <Route path="/movie/:movieId" element={<MovieDetail />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
