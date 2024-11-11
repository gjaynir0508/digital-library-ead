// import React from 'react'
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { HiOutlineHeart } from "react-icons/hi2";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import {
	useFetchLikedBooksByIdQuery,
	useLikeBookMutation,
	useUnlikeBookMutation,
} from "../../redux/features/books/booksApi";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const BookCard = ({ book, isForLikedPage = false }) => {
	const dispatch = useDispatch();
	const { currentUser } = useAuth();
	const { data: likedBooks = [] } = useFetchLikedBooksByIdQuery(
		currentUser?.uid
	);
	const [isLiked, setIsLiked] = useState(
		likedBooks.findIndex((likedBook) => likedBook.bookId === book._id) >= 0
	);

	const [likeBook] = useLikeBookMutation();
	const [unlikeBook] = useUnlikeBookMutation();

	const handleAddToCart = (product) => {
		dispatch(addToCart(product));
	};
	const handleLike = () => {
		if (!currentUser) return;
		if (!isLiked) {
			likeBook({ bookId: book._id, userId: currentUser?.uid });
			setIsLiked(true);
		} else {
			unlikeBook({ bookId: book._id, userId: currentUser?.uid });
			setIsLiked(false);
		}
	};
	return (
		<div className="relative rounded-lg transition-shadow duration-300">
			<div className="flex flex-col sm:flex-row sm:items-center sm:h-72  sm:justify-center gap-4">
				<div className="sm:h-72 sm:flex-shrink-0 rounded-md">
					<Link to={`/books/${book._id}`}>
						<img
							src={`${getImgUrl(book?.coverImage)}`}
							alt={book.title}
							className="w-full max-w-[180px] bg-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-all duration-200"
						/>
					</Link>
				</div>

				<div>
					<Link to={`/books/${book._id}`}>
						<h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
							{book?.title}
						</h3>
					</Link>
					<p className="text-white mb-5">
						{book?.description.length > 80
							? `${book.description.slice(0, 80)}...`
							: book?.description}
					</p>
					{!isForLikedPage && (
						<>
							<p className="font-medium mb-5">
								{book?.newPrice === 0 ? (
									""
								) : (
									<span>
										${book?.newPrice}{" "}
										<span className="line-through font-normal ml-2">
											$ {book?.oldPrice}
										</span>
									</span>
								)}
								<br />
							</p>
							<div className="flex gap-2 relative">
								<button
									onClick={() => handleAddToCart(book)}
									className="btn-primary px-6 space-x-1 flex items-center gap-1 "
								>
									<FiShoppingCart className="" />
									<span>Add to Cart</span>
								</button>
								<div className="flex items-center justify-center">
									<span
										className="cursor-pointer"
										onClick={handleLike}
									>
										<HiOutlineHeart
											size={18}
											fill={isLiked ? "red" : "none"}
										/>
									</span>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default BookCard;
