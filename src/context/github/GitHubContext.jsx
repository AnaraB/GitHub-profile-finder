import { createContext, useReducer } from "react";
import githubReducer from "./GitHubReducer";

const GithubContext = createContext();

//save env variables for rest api calls
const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  //get single user
  const getUser = async (login) => {
    setLoading();

    //pass on login  to request api call
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    //if such user is not found redirect to NOT FOUND page
    if (response.status === 400) {
      window.location = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };



// get all users results 
  const searchUsers = async (text) => {
    setLoading();

    //create params variable to get hold of search params obj
    const params = new URLSearchParams({
      q: text,
    });

    //pass on input params value to request api call
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    //destructure received data and get hold of items
    const { items } = await response.json();

    //after we get data, dispatch actions to githubReducer
    //payload is additional information to perform the state transition
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //create set loading function
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  //create clear profiles function
  const clearUsers = () => dispatch({ type: "CLEAR_USERS" });

  return (
    <GithubContext.Provider
      //thanks to function gitHubReducer we now can
      // update states and pass them in a value obj
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
