import { useState } from "react";
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export default function Searchbar ({onSubmit}) {
    const [query, setQuery] = useState('');
 
    const handlChange = e => {
        setQuery(e.currentTarget.value.toLowerCase());
    //     const { value } = e.target;
    // setQuery(value);
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (query.trim() === '') {
            alert('Nothing found');
            return;
        }
        onSubmit(query);
    }

    return (
        <div className={s.Searchbar}>
            <form onSubmit={handleSubmit} className={s.SearchForm}>
                <label>
                <input
                    className={s.SearchForm_input}
                    type="text"
                    name="movie"
                    placeholder="Enter movie name..."
                    autoComplete="off"
                    onChange={handlChange}
                    value={query}
                />
                </label>
                <button type="submit" className={s.SearchForm_button}>
                    <span className={s.SearchForm_button_label}>
                        Search
                    </span>
                </button>
            </form>
        </div>
    );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};