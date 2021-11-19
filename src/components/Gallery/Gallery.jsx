import s from './Gallery.module.css';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Gallery({ movies}) {
  const location = useLocation();
  return (
    <ul className={s.ImageGallery}>
      {movies &&
        movies.map(({ id, title, poster_path, original_title, name , release_date}) => (
          <li key={id}>
            <Link
              to={{
                pathname: `/movies/${id}`,
                state: { from: location },
              }}
              className={s.link}
              >
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                  alt={original_title || name}
                />
                <div>
                  <h2>{title}</h2>
                  {release_date && <span> ({release_date.slice(0, 4)})</span>}
                </div>
              </div>
            </Link>
          </li>
        ))}
    </ul>
  );
}

Gallery.propTypes = {
  movies: PropTypes.array.isRequired,
};
