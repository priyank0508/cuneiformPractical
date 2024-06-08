import { SET_ARTICLE } from "../action";


const initialState = {
  articles: [],
};

const ArticleReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ARTICLE:
      return {
        ...state,
        articles: action.payload,
      };
    default:
      return state;
  }
};

export default ArticleReducer;
