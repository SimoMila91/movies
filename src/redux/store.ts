import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { moviesReducer, genresReducer, detailsReducer } from './reducers/moviesReducer';

const reducer = combineReducers({
  movies: moviesReducer,
  genres: genresReducer,
  details: detailsReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
export type RootState = ReturnType<typeof reducer>;