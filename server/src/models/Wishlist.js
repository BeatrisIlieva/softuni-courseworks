const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: {
    type: Number,
    ref: "User",
    required: true,
  },
  jewelry: {
    type: Number,
    ref: "Jewelry",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = wishlist;
