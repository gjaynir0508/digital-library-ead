import React from "react";
import { useParams } from "react-router-dom";
import { useFetchBooksBySearchQuery } from "../../redux/features/books/booksApi";
import BookCard from "./BookCard";

export default function SearchResults() {
	const { keyword } = useParams();
	const { data, isLoading, isError } = useFetchBooksBySearchQuery(keyword);
	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error getting books data</div>;
	return (
		<div>
			<h1 className="text-2xl font-bold mb-4">Search Results</h1>
			{data.length === 0 ? (
				<div>No books found!</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
					{data.map((book) => (
						<BookCard key={book._id} book={book} />
					))}
				</div>
			)}
		</div>
	);
}
