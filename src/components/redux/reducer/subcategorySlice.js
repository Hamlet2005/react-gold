import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  subcategorys: [],
  isLoading: false,
  error: "",
};

export const getSubcategorysThunk = createAsyncThunk(
  "subcategorys/get",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("http://localhost:3100/subcategory");
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

const subcategorysSlice = createSlice({
  name: "subcategorys",
  initialState,
  extraReducers: {
    [getSubcategorysThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getSubcategorysThunk.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.subcategorys = action.payload;
    },
    [getSubcategorysThunk.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default subcategorysSlice.reducer;
