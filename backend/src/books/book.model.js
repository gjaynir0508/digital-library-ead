const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
	{
		_id: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		author: {
			type: String,
			required: false,
		},
		category: {
			type: String,
			required: true,
		},
		trending: {
			type: Boolean,
			required: true,
		},
		coverImage: {
			type: String,
			required: true,
		},
		oldPrice: {
			type: Number,
			required: true,
		},
		newPrice: {
			type: Number,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		pdfUrl: {
			type: String,
			required: false,
		},
	},
	{
		timestamps: true,
	}
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
