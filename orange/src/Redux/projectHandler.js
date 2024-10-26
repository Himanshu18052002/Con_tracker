import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  project: 1,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    projectID: (state, action) => {
      state.project = action.payload;
    },
  },
});

export const { projectID } = projectSlice.actions;
export default projectSlice.reducer;
