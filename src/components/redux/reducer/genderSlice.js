import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  genders: [],
  isLoading: false,
  error: "",
};

export const getGendersThunk = createAsyncThunk(
    "genders/get",
    async(_, thunkApi) => {
        try {
            const response = await axios.get("http://localhost:3100/genders");
            return response.data;
        } catch (e) {
          console.log(e);
          return thunkApi.rejectWithValue(e.message);
        }
    }
);

const gendersSlice = createSlice({
  name: "genders",
  initialState,
  extraReducers: {
    [getGendersThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getGendersThunk.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.genders = action.payload;
    },
    [getGendersThunk.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default gendersSlice.reducer;
