const express = require("express");
const Like = require("./likes.model");
const {
	getLikes,
	getLikesByBookId,
	getLikesByUserId,
	checkIfLiked,
	addLike,
	deleteLike,
	getLikedBookDetails,
} = require("./likes.controller");
const router = express.Router();

router.get("/", getLikes);

router.get("/book/:bookId", getLikesByBookId);

router.get("/user/:userId", getLikesByUserId);

router.get("/user/:userId/data", getLikedBookDetails);

router.get("/user/:userId/book/:bookId", checkIfLiked);

router.post("/", addLike);

router.delete("/:uid/:bid", deleteLike);

module.exports = router;
