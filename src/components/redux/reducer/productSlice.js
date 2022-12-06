import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  isLoading: false,
  error: "",
};

export const getProductsThunk = createAsyncThunk(
  "products/get",
  async (_, thunkApi) => {
    try {
      const response = await axios.get("http://localhost:3100/products");
      return response.data;
    } catch (e) {
      console.log(e);
      return thunkApi.rejectWithValue(e.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: {
    [getProductsThunk.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getProductsThunk.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.products = action.payload;
    },
    [getProductsThunk.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});



export default productsSlice.reducer;
