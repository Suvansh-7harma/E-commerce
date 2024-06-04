import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) ?? [];
console.log(initialState);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    deleteFromCart(state, action) {
      const updatedState = state.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
    incrementQuantity(state, action) {
      const updatedState = state.map((item) => {
        if (item.id === action.payload) {
          item.quantity++;
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
    decrementQuantity(state, action) {
      const updatedState = state.map((item) => {
        if (item.id === action.payload && item.quantity > 1) {
          item.quantity--;
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(updatedState));
      return updatedState;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
