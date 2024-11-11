const { default: mongoose } = require("mongoose");
const Like = require("./likes.model");
const Book = require("../books/book.model");

const getLikes = async (req, res) => {
	try {
		const likes = await Like.find();
		res.json(likes);
	} catch (error) {
		res.status(500).send(error);
	}
};

const getLikesByBookId = async (req, res) => {
	try {
		const likes = await Like.find({ bookId: req.params.bookId });
		res.json(likes);
	} catch (error) {
		res.status(500).send(error);
	}
};

const getLikesByUserId = async (req, res) => {
	try {
		console.log(req.params.userId);
		const likes = await Like.find({ userId: req.params.userId });
		res.json(likes);
	} catch (error) {
		console.error("Error fetching likes", error);
		res.status(500).send(error);
	}
};

const getLikedBookDetails = async (req, res) => {
	try {
		const likes = await Like.find({ userId: req.params.userId });
		const bookIds = likes.map((like) => like.bookId);
		const books = await Book.find({ _id: { $in: bookIds } });
		res.json(books);
	} catch (error) {
		console.error("Error fetching likes", error);
		res.status(500).send(error);
	}
};

const checkIfLiked = async (req, res) => {
	try {
		const like = await Like.findOne({
			userId: req.params.userId,
			bookId: req.params.bookId,
		});
		res.json(like);
	} catch (error) {
		res.status(500).send(error);
	}
};

const addLike = async (req, res) => {
	try {
		const like = new Like({
			...req.body,
			_id: new mongoose.Types.ObjectId(),
		});
		await like.save();
		res.json(like);
	} catch (error) {
		console.error("Error adding like", error);
		res.status(500).send(error);
	}
};

const deleteLike = async (req, res) => {
	try {
		const like = await Like.deleteOne({
			userId: req.params.uid,
			bookId: req.params.bid,
		});
		res.json(like);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = {
	getLikes,
	getLikesByBookId,
	getLikesByUserId,
	getLikedBookDetails,
	checkIfLiked,
	addLike,
	deleteLike,
};
