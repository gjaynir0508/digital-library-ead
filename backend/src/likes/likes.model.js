const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	bookId: {
		type: Number,
		required: true,
	},
	userId: {
		type: String,
		required: true,
	},
});

const Like = mongoose.model("Like", likeSchema);

module.exports = Like;
