import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useGetOrderByEmailQuery } from "../../../redux/features/orders/ordersApi";
import { useFetchLikedBooksDataQuery } from "../../../redux/features/books/booksApi";
import BookCard from "../../books/BookCard";

const LikedBooksDashboard = () => {
	const { currentUser } = useAuth();
	const {
		data: orders = [],
		isLoading,
		isError,
	} = useGetOrderByEmailQuery(currentUser?.email);
	const {
		data: likedBooks = [],
		isLoading: likedBooksLoading,
		isError: likedBooksError,
	} = useFetchLikedBooksDataQuery(currentUser?.uid);

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error getting orders data</div>;

	return (
		<div className=" bg-gray-100 py-16">
			<div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
				<p className="text-gray-700 mb-6">
					Welcome, {currentUser?.name || "User"}! Here are your liked
					books:
				</p>

				<div className="mt-6">
					<h2 className="text-xl font-semibold mb-4">Liked Books</h2>
					{likedBooks.length > 0 ? (
						<div className="grid grid-cols-1">
							{likedBooks.map((book) => (
								<BookCard
									key={book._id}
									book={book}
									isForLikedPage
								/>
							))}
						</div>
					) : (
						<p className="text-gray-600">
							You have no liked books.
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default LikedBooksDashboard;
