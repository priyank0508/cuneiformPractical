import { combineReducers } from 'redux';
import ArticleReducer from './articleReducer';

const rootReducer = combineReducers({
  articleReducer: ArticleReducer,
});

export default rootReducer;
