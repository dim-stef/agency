import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Project } from "../../flat/HeroCarouselItem/interface";
import projects from '../../data/projects.json';

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: projects[0],
  },
  reducers: {
    changeTheme: (state, action: PayloadAction<Project>) => {
      state.theme = action.payload;
    },
  },
});

export const {changeTheme} = themeSlice.actions;
