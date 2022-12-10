export const ACTIONS = {
  SIGNUP: "SIGNUP",
  LOADING: "LOADING",
  ERROR: "ERROR",
  LINK: "LINK",
};

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.SIGNUP:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTIONS.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ACTIONS.LINK:
      return {
        ...state,
        link: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
