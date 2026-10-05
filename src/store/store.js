import { configureStore } from "@reduxjs/toolkit";
import assetsReducer from "./assetsSlice";
import ticketsReducer from "./ticketsSlice";


export const store = configureStore({
  reducer: {
    assets: assetsReducer,
    tickets: ticketsReducer,
  },
});