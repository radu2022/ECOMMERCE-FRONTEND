// FILE: ./redux/store.jsx
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    // *** CHANGE 'product' TO 'products' (plural) ***
    product: productSlice, // <-- Correct key
  },
});

export default store;
