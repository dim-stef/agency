import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectInterface } from "../../flat/HeroCarouselItem/interface";
import Project from "../../flat/Project";
import projects from '../../data/projects.json';

interface ThemeStateInterface{
  theme: null | ProjectInterface
}

export const themeSlice = createSlice({
  name: "theme",
  initialState: <ThemeStateInterface>{
    theme: null,
  },
  reducers: {
    changeTheme: (state, action: PayloadAction<ProjectInterface>) => {
      state.theme = action.payload;
    },
  },
});

export const {changeTheme} = themeSlice.actions;
