import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  categorys: [],
  isLoading: false,
  error: "",
};

export const getCategorysThunk = createAsyncThunk(
  "categorys/get",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("http://localhost:3100/category");
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

const categorysSlice = createSlice({
  name: "categorys",
  initialState,
  extraReducers: {
    [getCategorysThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getCategorysThunk.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.categorys = action.payload;
    },
    [getCategorysThunk.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});



export default categorysSlice.reducer;
