export const SET_ARTICLE = 'SET_ARTICLE';

export const fetchArticles = (item) => ({
  type: SET_ARTICLE,
  payload: item,
});