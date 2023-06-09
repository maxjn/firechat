import {
  createContext,
  useState,
  useEffect,
  useReducer,
  useContext,
} from "react";
import { AuthContext } from "./AuthContext";

export const ChatContext = createContext("");

export const ChatContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  // get the users info

  return (
    <ChatContext.Provider value={{ selectedUser: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
