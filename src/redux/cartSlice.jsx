import { createSlice } from "@reduxjs/toolkit";

const MAX_QUANTITY = 10; // Example: Define max quantity limit if needed

// Helper function to save the current state to local storage
const saveToLocalStorage = (state) => {
  try {
    localStorage.setItem("cart", JSON.stringify(state));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

// Load initial state from local storage
const loadInitialState = () => {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch {
    return [];
  }
};

const initialState = loadInitialState();

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = {
        ...action.payload,
        quantity: action.payload.quantity || 1,
      };
      state.push(item);
      saveToLocalStorage(state);
    },
    deleteFromCart(state, action) {
      const updatedState = state.filter(
        (item) => item.id !== action.payload.id
      );
      saveToLocalStorage(updatedState);
      return updatedState;
    },
    incrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item && item.quantity < MAX_QUANTITY) {
        item.quantity++;
        saveToLocalStorage(state);
      }
    },
    decrementQuantity(state, action) {
      const item = state.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
          saveToLocalStorage(state);
        } else {
          const updatedState = state.filter((i) => i.id !== item.id);
          saveToLocalStorage(updatedState);
          return updatedState;
        }
      }
    },
    clearCart() {
      const updatedState = [];
      saveToLocalStorage(updatedState);
      return updatedState;
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
