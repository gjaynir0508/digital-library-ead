const books = require("./books.json");
const Book = require("../books/book.model.js");
const { default: mongoose } = require("mongoose");

async function seed() {
	await mongoose.connect("mongodb://localhost:27017/digital-library-ead");
	Book.deleteMany()
		.then(() => Book.create(books))
		.catch((error) => console.error(error));
}

seed();
