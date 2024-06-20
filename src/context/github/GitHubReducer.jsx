const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    // case 'DECREASE':
    //   return count - 1;
    default:
      return state;
  }
};

export default githubReducer;
