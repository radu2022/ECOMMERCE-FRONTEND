import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.products.find(
        (item) => item.id === newItem.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.products.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          image: newItem.image,
        });
      }
      state.totalQuantity += 1;
      state.totalPrice += newItem.price;
    },
    incrementQuantity(state, action) {
      const id = action.payload;
      const product = state.products.find((item) => item.id === id);
      if (product) {
        product.quantity += 1;
        state.totalQuantity += 1;
        state.totalPrice += product.price;
      }
    },
    decrementQuantity(state, action) {
      const id = action.payload;
      const product = state.products.find((item) => item.id === id);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        state.totalQuantity -= 1;
        state.totalPrice -= product.price;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const product = state.products.find((item) => item.id === id);
      if (product) {
        state.totalQuantity -= product.quantity;
        state.totalPrice -= product.price * product.quantity;
        state.products = state.products.filter((item) => item.id !== id);
      }
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;
