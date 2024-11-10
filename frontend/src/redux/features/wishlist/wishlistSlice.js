
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishlistItems: [],
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const itemExists = state.wishlistItems.find(item => item._id === action.payload._id);
            if (!itemExists) {
                state.wishlistItems.push(action.payload);
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter(item => item._id !== action.payload._id);
        },
        clearWishlist: (state) => {
            state.wishlistItems = [];
        }
    },
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;