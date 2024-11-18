

import { createSlice } from "@reduxjs/toolkit";

// Initial state is fetched from local storage or set to an empty array
const initialState = JSON.parse(localStorage.getItem("cart")) || [];

// Helper function to save the current state to local storage
const saveToLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Adds an item to the cart
    addToCart(state, action) {
      state.push(action.payload);
      saveToLocalStorage(state);
    },

    // Deletes an item from the cart based on its id
    deleteFromCart(state, action) {
      const updatedState = state.filter(
        (item) => item.id !== action.payload.id
      );
      saveToLocalStorage(updatedState);
      return updatedState; // Return updated state to replace the old one
    },

    // Increments quantity of an item in the cart
    incrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        saveToLocalStorage(state);
      }
    },

    // Decrements quantity of an item in the cart, removing it if quantity is 1
    decrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          const updatedState = state.filter((i) => i.id !== item.id);
          saveToLocalStorage(updatedState);
          return updatedState;
        }
        saveToLocalStorage(state);
      }
    },
  },
});

// Action creators for each reducer function
export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

// Exporting the reducer
export default cartSlice.reducer;
