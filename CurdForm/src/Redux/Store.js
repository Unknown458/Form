import { configureStore } from "@reduxjs/toolkit";
import formDataSlice from "./Formslice"; 

export const store = configureStore({
  reducer: {
    formData: formDataSlice,  
  },
});