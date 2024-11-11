import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

const baseQuery = fetchBaseQuery({
	baseUrl: `${getBaseUrl()}/api/books`,
	credentials: "include",
	prepareHeaders: (Headers) => {
		const token = localStorage.getItem("token");
		if (token) {
			Headers.set("Authorization", `Bearer ${token}`);
		}
		return Headers;
	},
});

const booksApi = createApi({
	reducerPath: "booksApi",
	baseQuery,
	tagTypes: ["Books"],
	endpoints: (builder) => ({
		fetchAllBooks: builder.query({
			query: () => "/",
			providesTags: ["Books"],
		}),
		fetchBookById: builder.query({
			query: (id) => `/${id}`,
			providesTags: (result, error, id) => [{ type: "Books", id }],
		}),
		fetchLikedBooksById: builder.query({
			query: (id) => `/likes/user/${id}`,
			providesTags: ["Books"],
		}),
		fetchLikedBooksData: builder.query({
			query: (id) => `/likes/user/${id}/data`,
			providesTags: ["LikedBooks"],
		}),
		fetchLikedByUserByBookId: builder.query({
			query: (uid, bid) => `/likes/user/${uid}/book/${bid}`,
			providesTags: ["Book"],
		}),
		fetchBooksBySearch: builder.query({
			query: (search) => `/search/${search}`,
			providesTags: ["SearchBooks"],
		}),
		addBook: builder.mutation({
			query: (newBook) => ({
				url: `/create-book`,
				method: "POST",
				body: newBook,
			}),
			invalidatesTags: ["Books"],
		}),
		updateBook: builder.mutation({
			query: ({ id, ...rest }) => ({
				url: `/edit/${id}`,
				method: "PUT",
				body: rest,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Books"],
		}),
		deleteBook: builder.mutation({
			query: (id) => ({
				url: `/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Books"],
		}),
		likeBook: builder.mutation({
			query: (like) => ({
				url: `/likes`,
				method: "POST",
				body: like,
			}),
			invalidatesTags: ["Books"],
		}),
		unlikeBook: builder.mutation({
			query: (like) => ({
				url: `/likes/${like.userId}/${like.bookId}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Books"],
		}),
	}),
});

export const {
	useFetchAllBooksQuery,
	useFetchBookByIdQuery,
	useFetchLikedBooksByIdQuery,
	useFetchLikedByUserByBookIdQuery,
	useFetchLikedBooksDataQuery,
	useFetchBooksBySearchQuery,
	useAddBookMutation,
	useUpdateBookMutation,
	useDeleteBookMutation,
	useLikeBookMutation,
	useUnlikeBookMutation,
} = booksApi;
export default booksApi;
