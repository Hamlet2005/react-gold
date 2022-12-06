import { configureStore } from "@reduxjs/toolkit";
import categorysReducer from "./reducer/categorySlice";
import gendersReducer from './reducer/genderSlice'
import subcategorysReducer from "./reducer/subcategorySlice";
import productsReducer from "./reducer/productSlice";

const store = configureStore({
  reducer: {
    categorysReducer,
    gendersReducer,
    subcategorysReducer,
    productsReducer
  },
});

export default store