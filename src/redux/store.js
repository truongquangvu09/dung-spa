import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './Slice/cartSlice';
const store = configureStore({
    reducer: {
        cart: cartSlice,
    },
});
export default store;
