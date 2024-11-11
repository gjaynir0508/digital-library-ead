import { useState } from "react";
import BookCard from "../books/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

const categories = [
	"Choose a genre",
	"Business",
	"Fiction",
	"Horror",
	"Adventure",
];

const FreeBooks = () => {
	const [selectedCategory, setSelectedCategory] = useState("Choose a genre");
	const { data: books = [] } = useFetchAllBooksQuery();

	const filteredBooks =
		selectedCategory === "Choose a genre"
			? books.filter((book) => book.newPrice === 0)
			: books.filter(
					(book) =>
						book.category === selectedCategory.toLowerCase() &&
						book.newPrice === 0
			  );

	return (
		<div className="py-10">
			<h2 className="text-3xl font-semibold mb-6">Free Books</h2>
			<div className="mb-8 flex items-center">
				<select
					onChange={(e) => setSelectedCategory(e.target.value)}
					name="category"
					id="category"
					className="border rounded-md px-4 py-2 focus:outline-none"
					style={{ backgroundColor: "#ffd82c" }}
				>
					{categories.map((category, index) => (
						<option
							key={index}
							value={category}
							className="capitalize hover:bg-black"
						>
							{category}
						</option>
					))}
				</select>
			</div>

			<Swiper
				slidesPerView={1}
				spaceBetween={30}
				navigation={true}
				breakpoints={{
					640: {
						slidesPerView: 1,
						spaceBetween: 20,
					},
					768: {
						slidesPerView: 2,
						spaceBetween: 40,
					},
					1024: {
						slidesPerView: 2,
						spaceBetween: 50,
					},
					1180: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
				modules={[Pagination, Navigation]}
				className="mySwiper"
			>
				{filteredBooks.length > 0 ? (
					filteredBooks.map((book, index) => (
						<SwiperSlide key={index}>
							<BookCard book={book} />
						</SwiperSlide>
					))
				) : (
					<p className="text-zinc-900">No books found</p>
				)}
			</Swiper>
		</div>
	);
};

export default FreeBooks;
