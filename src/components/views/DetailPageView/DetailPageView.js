import { useEffect, useState, Suspense, lazy } from 'react';
import * as Api from '../../Api/ApiService';
import {Routes, useNavigate, Route, useLocation, useParams, NavLink } from "react-router-dom";
import Loader from '../../Loader';

const Cast = lazy(() =>
  import('./Cast'),
);
const Reviews = lazy(() =>
  import('./Reviews'),
);




export default function DetailPageView() {
    const navigate = useNavigate();
    const location = useLocation();
    const [movie, setMovie] = useState(null);
    const [status, setStatus] = useState('idle');
    const { movieId } = useParams();

    useEffect(() => {
        setStatus('pending');
        Api.getMovieById(movieId).then(setMovie);
        setStatus('resolved');
      }, [movieId]);

    const onGoBack = () => {
        if (location.pathname === `/movies/${movieId}`) {
        navigate(-1);
        }
        if (location.pathname === `/movies/${movieId}/cast`) {
        navigate(-2);
        }
        if (location.pathname === `/movies/${movieId}/reviews`) {
        navigate(-2);
        }
    };

    return (
        <>
             {status === 'pending' && <Loader />}
      <button type="button" onClick={onGoBack}>
        Go back
      </button>
      {movie && (
        <div >
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.original_title || movie.name}
          />
          <div>
            <h2>{movie.original_title || movie.name}</h2>
            <p>Average rating: {movie.vote_average}</p>
            <h3>Overview</h3>
            <p>{movie.overview}</p>
            <h3>Genres</h3>
            <div>
              {movie.genres.map(genre => (
                <span key={genre.id}>
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      <div>
        <span>Additional information</span>
        <ul>
          <li>
            <NavLink to="cast">Cast</NavLink>
          </li>
          <li >
            <NavLink to="reviews">Reviews</NavLink>
          </li>
        </ul>
      </div>

      <Suspense fallback={<Loader />}>
        <Routes>
          
          <Route path="/cast" element={<Cast />} />
          <Route path="/reviews" element={<Reviews />} />
        </Routes>
      </Suspense>
        </>
    ) 
}