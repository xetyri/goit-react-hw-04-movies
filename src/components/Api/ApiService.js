import axios from 'axios';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
const POPULAR_URL = 'trending/movie/day';
const API_KEY = 'b1b3673ec244ff3939488ad480401173';
const SEARCH_URL = '/search/movie';
const ID_URL = '/movie/';

export async function getTrendMovies(page) {
  try {
    const { data } = await axios.get(
      `${POPULAR_URL}?api_key=${API_KEY}&page=${page}`
    );
    console.log(data);
    return data;
  }
  catch (error) {
    console.error(error);
  }
}

export async function getMovieById(id) {
  try {
    const { data } = await axios.get(`${ID_URL}${id}?api_key=${API_KEY}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}
export async function getMovieSearch(movie, page) {
  try {
    const { data } = await axios.get(
      `${SEARCH_URL}?api_key=${API_KEY}&query=${movie}&page=${page}`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
}
export async function fetchCast(id) {
  try {
    const { data } = await axios.get(
      `${ID_URL}${id}/credits?api_key=${API_KEY}`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchReviews(id) {
  try {
    const { data } = await axios.get(
      `${ID_URL}${id}/reviews?api_key=${API_KEY}&page=1`
    );

    return data;
  } catch (error) {
    console.error(error);
  }
}

///////////////////////////////////////////////////////////////////////////////////