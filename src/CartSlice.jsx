import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      // Destructure product details from the action payload: { name, image, cost }
      const { name, image, cost } = action.payload; 
      
      // Check if the item already exists in the cart by comparing names
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        // If item already exists in the cart, increase its quantity
        existingItem.quantity++;
      } else {
        // If item does not exist, add it to the cart with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    
    removeItem: (state, action) => {
      // The action.payload is the name of the item to remove (e.g., 'Rose Plant')
      // This creates a new array excluding the item whose name matches the payload
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    
    updateQuantity: (state, action) => {
      // Destructure the product name and new quantity from the action payload: { name, quantity }
      const { name, quantity } = action.payload; 
      
      // Find the item in the cart that matches the given name
      const itemToUpdate = state.items.find(item => item.name === name);
      
      if (itemToUpdate) {
        // If the item is found, update its quantity to the new value
        itemToUpdate.quantity = quantity; 
      }
    },
  },
});

// ---

// Handle Actions: Export the action creators for components to dispatch
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// ---

// Export the reducer as the default to use in store.js
export default CartSlice.reducer;