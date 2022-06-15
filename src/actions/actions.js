export const SET_MOVIES = 'SET_MOVIES';
export const SET_USER = 'SET_USER';
export const SET_FILTER = 'SET_FILTER';
export const SET_FAVORITE_MOVIES = 'SET_FAVORITE_MOVIES';


export function setMovies(value) {
  console.log('SET_MOVIES action triggered');
  return {
    type: SET_MOVIES,
    value
  };
}


export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}

export function setFavoriteMovies(value) {
  console.log('SET_FAVORITE_MOVIES action triggered');
  return {
    type: SET_FAVORITE_MOVIES,
    value
  };
}

export function setUser(value) {
  
  console.log('SET_USER action triggered');
  return { type: SET_USER, 
    value };
}