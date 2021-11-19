import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import * as Api from '../../Api/ApiService'
import Load from '../../Loader';



export default function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [status, setStatus] = useState('idle');

    const { movieId } = useParams();

    useEffect(() => {
        fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = () => {
        setStatus('pending');
        Api.fetchReviews(movieId).then((res) => {
        setReviews(res.results);
        });
        setStatus('resolved');
        handlePageScroll();
    };

    const handlePageScroll = () => {
        window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
        });
    };

    return (
        <>
        {status === 'pending' && (
            <Load/>
        )}
        <div>
            <ul>
            {reviews && reviews.length > 0
                ? reviews.map(({ id, author, content, url }) => (
                    <li key={id}>
                    <h3>Author: {author}</h3>

                    <p>{content.slice(0, 730)}...</p>
                    </li>
                ))
                : "We don't have any reviews for this movie"}
            </ul>
        </div>
        </>
    );
    
}



Reviews.propTypes = {
  movieId: PropTypes.string,
};