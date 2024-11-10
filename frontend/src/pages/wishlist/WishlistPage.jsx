import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../../redux/features/wishlist/wishlistSlice';

const WishlistPage = () => {
    const wishlistItems = useSelector((state) => state.wishlist.items);
    const dispatch = useDispatch();

    const handleRemoveFromWishlist = (item) => {
        dispatch(removeFromWishlist(item));
    };

    if (!wishlistItems.length) {
        return <div>No items in your wishlist.</div>;
    }

    return (
        <div>
            <h1>Your Wishlist</h1>
            <ul>
                {wishlistItems.map(item => (
                    <li key={item._id}>
                        {item.title}
                        <button onClick={() => handleRemoveFromWishlist(item)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WishlistPage;