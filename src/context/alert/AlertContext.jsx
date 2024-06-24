import { createContext, useReducer } from "react";
import alertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  //alert is null by default
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer, initialState);

  //set an alert function
  const setAlert = (msg, type) => {
    
    dispatch({
      type: "SET_ALERT",
      payload: { msg, type },
    });

    //remove alert message after 3 sec
    setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 3000);
  };

  return (
    <AlertContext.Provider value={{ alert: state, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
