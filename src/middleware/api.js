import { SET_SEARCH_RESULTS } from '../constants/action-types';
import { setSearchResults } from '../actions/searchResults';

const URL = 'https://s3.amazonaws.com/500tech-shared/db.json';
const SEARCH_URL = 'https://api.trd.toptour.no';

function fetchData(url, callback) {
  fetch(url)
    .then((response) => {
      if (response.status !== 200) {
        console.log(`Error fetching setRecipes: ${ response.status }`);
      } else {
        response.json().then(callback);
      }
    })
    .catch((err) => console.log(`Error fetching recipes: ${ err }`))
}


const apiMiddleware = ({ dispatch }) => next => action => {
  // if (action.type === FETCH_RECIPES) {
  //   fetchData(URL, data => dispatch(setRecipes(data.recipes)));
  // } else 

  if (action.type === FETCH_SEARCH) {
    fetchData(SEARCH_URL, data => dispatch(setSearchResults(data.hits)));
  }

  next(action);
};

export default apiMiddleware;