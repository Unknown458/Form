// Redux/Formslice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: JSON.parse(localStorage.getItem('formData')) || []
};

const formSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addData: (state, action) => {
      state.data.push(action.payload);
      localStorage.setItem('formData', JSON.stringify(state.data));
    },
    removeData: (state, action) => {
      state.data = state.data.filter(item => item.studentId !== action.payload);
      localStorage.setItem('formData', JSON.stringify(state.data));
    },
    updateData: (state, action) => {
      const index = state.data.findIndex(item => item.studentId === action.payload.studentId);
      if (index !== -1) {
        state.data[index] = action.payload;
        localStorage.setItem('formData', JSON.stringify(state.data));
      }
    }
  }
});

export const { addData, removeData, updateData } = formSlice.actions;
export default formSlice.reducer;
