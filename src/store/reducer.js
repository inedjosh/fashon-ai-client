export const ACTIONS = {
  SIGNUP: "SIGNUP",
};

const reducers = (state, action) => {
  switch (action.type) {
    case ACTIONS.SIGNUP:
      return {
        ...state,
        auth: action.payload,
      };
    default:
      return state;
  }
};

export default reducers;
