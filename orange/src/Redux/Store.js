import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import loginReducer from "./loginHandle";
import projectReducer from "./projectHandler";

export const Store = configureStore({
  reducer: {
    login: loginReducer,
    project: projectReducer,
  },
  // middleware: [thunk],
});
