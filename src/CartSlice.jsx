import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const existingItem = state.items.find(item => item.name === action.payload.name);
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice += action.payload.price;
            } else {
                state.items.push({
                    ...action.payload,
                    quantity: 1,
                    totalPrice: action.payload.price
                });
            }
            state.totalQuantity++;
            state.totalAmount += action.payload.price;
        },
        removeItem: (state, action) => {
            const itemName = action.payload;
            const existingItem = state.items.find(item => item.name === itemName);
            if (existingItem) {
                state.totalQuantity -= existingItem.quantity;
                state.totalAmount -= existingItem.totalPrice;
                state.items = state.items.filter(item => item.name !== itemName);
            }
        },
        updateQuantity: (state, action) => {
            const { name, newQuantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.name === name);
            if (itemToUpdate) {
                const quantityDiff = newQuantity - itemToUpdate.quantity;
                state.totalQuantity += quantityDiff;
                itemToUpdate.quantity = newQuantity;
                itemToUpdate.totalPrice = itemToUpdate.price * newQuantity;
                state.totalAmount = state.items.reduce((sum, item) => sum + item.totalPrice, 0);
            }
        },
        clearCart: (state) => {
            return initialState;
        }
    }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;