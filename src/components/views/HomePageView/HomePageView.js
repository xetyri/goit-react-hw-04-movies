import { useState, useEffect } from "react";
import Gallery from "../../Gallery";
import * as Api from '../../Api/ApiService';
import Button from "../../Button";
import Loader from '../../Loader';


export default function HomeView() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState('idle');

    
  useEffect(() => {
    getTrendFilm();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTrendFilm = () => {
    setStatus('pending');

    Api.getTrendMovies(page).then((res) => {
    const data = res.results;
    setMovies((prev) => [...prev, ...data]);
    });
    setPage((prev) => prev + 1);

    // if (page !== 1) {
    // // handlePageScroll();
    // }
    setStatus('resolved');
  };

  const loadMoreHandler = () => {
    getTrendFilm();
    
  };

  const showLoadMore = movies.length >=19

return (
    <>
      {status === 'pending' && (
        <Loader/>
      )}
      {movies ? (
        <Gallery movies={movies} url={'movies'} location={'/'} />
      ) : (
        <h2>Error getting movies</h2>
      )}
      {showLoadMore && <Button getMore={loadMoreHandler} />}
    </>
  );
}