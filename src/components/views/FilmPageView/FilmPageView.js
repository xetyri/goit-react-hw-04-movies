import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import Searchbar from '../../Searchbar';
import Loader from '../../Loader';
import * as Api from '../../Api/ApiService';
import Gallery from "../../Gallery";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

export default function FilmView() {
    const navigate = useNavigate();
    const location = useLocation();
    const [movies, setMovies] = useState([]);
    const [status, setStatus] = useState('idle');


    const getNewQuery = new URLSearchParams(location.search).get('text');

    useEffect(() => {
        if (!getNewQuery) {
        return;
        }
        if (getNewQuery.trim() === '') {
            alert('Nothing found, repeat search!');
            return;
        }
        setStatus('pending');
        Api
        .getMovieSearch(getNewQuery)
        .then(({ results }) => setMovies(results));
        setStatus('resolved');
    }, [getNewQuery]);

    const handleSearchbarSubmit = searchQuery => {
        navigate({ search: `?text=${searchQuery}`, state: { from: location } });
    };

    return (
      <>
          {status === 'pending' && (
              <Loader/>
          )} 
          {/* {console.log(movies)} */}
          <Searchbar onSubmit={handleSearchbarSubmit} />
          <Gallery movies={movies}/>
      </>
  );
}