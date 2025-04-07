const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Wishlist = require('../models/Wishlist');


router.get('/fetchWishlist', fetchuser, async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ userId: req.user.id });
    res.json(wishlist);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
