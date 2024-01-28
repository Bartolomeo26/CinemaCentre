import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './App.css'
import MovieDetails from './Movies/MovieDetails';
import MoviesList from './Movies/MoviesList';
import TVSeriesList from './Series/TVSeriesList';
import TVSeriesDetails from './Series/TVSeriesDetails';
import NotFound from './Partials/NotFound';
import ResponsiveAppBar from './Partials/Navbar';
import Footer from './Partials/Footer';
import ActorsList from './Actors/ActorsList';
import ActorDetails from './Actors/ActorDetails';
import UserDetails from './Users/UserDetails';
import Login from './Users/Login';
import Register from './Users/Register';
import Logout from './Users/Logout';
import Home from './Home';
import MoviesRanking from './Rankings/MoviesRanking';
import SeriesRanking from './Rankings/SeriesRanking'
import { AuthContext } from './helpers/AuthContext';
import EditReview from './Reviews/EditReview';

function App()
{

  const [authState, setAuthState] = useState(false);



  return (
    <>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <ResponsiveAppBar />
        <div className="m-3 ms-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rankings/movies" element={<MoviesRanking />} />
            <Route path="/rankings/series" element={<SeriesRanking />} />
            <Route path="/movies" element={<MoviesList />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
            <Route path="/movies/:id/reviews/:reviewId/edit" element={<EditReview />} />
            <Route path="/series" element={<TVSeriesList />} />
            <Route path="/series/:id" element={<TVSeriesDetails />} />
            <Route path="/series/:id/reviews/:reviewId/edit" element={<EditReview />} />
            <Route path="/actors" element={<ActorsList />} />
            <Route path="/actors/:id" element={<ActorDetails />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </AuthContext.Provider>
    </>
  )
}

export default App
