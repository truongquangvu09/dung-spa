import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    totalAmount: localStorage.getItem('totalAmount') ? JSON.parse(localStorage.getItem('totalAmount')) : 0,
    totalQuantity: localStorage.getItem('totalQuantity') ? JSON.parse(localStorage.getItem('totalQuantity')) : 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);
            state.totalQuantity += newItem.quantity;
            // state.totalQuantity += 1;
            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    productImg: newItem.productImg,
                    productPrice: newItem.productPrice,
                    quantity: newItem.quantity,
                    totalPrice: newItem.price * newItem.quantity,
                });
            } else {
                // existingItem.quantity += newItem.quantity;
                existingItem.quantity += 1;
                existingItem.totalPrice = Number(existingItem.totalPrice) + Number(newItem.productPrice);
            }
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.productPrice) * Number(item.quantity),
                0,
            );

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
            localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
        },
        deleteItem: (state, action) => {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                state.cartItems = state.cartItems.filter((item) => item.id !== id);
                state.totalQuantity = state.totalQuantity - existingItem.quantity;
            }
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total + Number(item.productPrice) * Number(item.quantity),
                0,
            );
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
        },
        decreaseCart: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === newItem.id);
            state.totalQuantity -= 1;
            if (existingItem) {
                existingItem.quantity -= 1;
            }
            state.totalAmount = state.cartItems.reduce(
                (total, item) => total - Number(item.productPrice),
                state.totalAmount,
            );

            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
            localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
        },
        clearCart: (state, action) => {
            state.cartItems = [];
            state.totalAmount = 0;
            state.totalQuantity = 0;
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
            localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
