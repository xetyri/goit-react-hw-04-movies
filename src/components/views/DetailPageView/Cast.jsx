import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as Api from '../../Api/ApiService';
import s from './Cast.module.css';

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);

  useEffect(() => {
    Api.fetchCast(movieId).then(setCast);
  }, [movieId]);

  return (
      <div>
        {cast && (
          <ul className={s.Image}>
            {cast.cast.map(actor => (
              <li key={actor.id}
              className={s.link}>
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                    alt={actor.name || actor.original_name}
                  />
                ) : (<p>No photo</p>)}
                <div >
                  <p >
                    {actor.name || actor.original_name}
                  </p>
                  <p >Character: {actor.character}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
  );
}

Cast.propTypes = {
  movieId: PropTypes.number,
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      actor: PropTypes.string.isRequired,
    }),
  ),
};