const express = require("express");
const router = express.Router();
const passport = require("passport");
const middleware = passport.authenticate("jwt", { session: false });

// Controllers
const {
    getPosts,
    getPostById,
    createPost,
    deletePost,
    likePost,
    unlikePost,
    createComment,
    deleteComment,
} = require("../../controllers/Post");

/**
 * @route   GET api/posts
 * @desc    Get posts
 * @access  Public
 */
router.get("/posts", getPosts);

/**
 * @route   GET api/posts/:id
 * @desc    Get post by id
 * @access  Public
 */
router.get("/posts/:id", getPostById);

/**
 * @route   POST api/posts
 * @desc    Create a post
 * @access  Private
 */
router.post("/posts", middleware, createPost);

/**
 * @route   DELETE api/posts/:id
 * @desc    Delete post
 * @access  Private
 */
router.delete("/posts/:id", middleware, deletePost);

/**
 * @route   POST api/posts/like/:id
 * @desc    Like post
 * @access  Private
 */
router.post("/posts/like/:id", middleware, likePost);

/**
 * @route   POST api/posts/unlike/:id
 * @desc    Unlike post
 * @access  Private
 */
router.post("/posts/unlike/:id", middleware, unlikePost);

/**
 * @route   POST api/posts/comment/:id
 * @desc    Add comment to post
 * @access  Private
 */
router.get("/posts/comment/:id", middleware, createComment);

/**
 * @route   DELETE api/posts/comment/:id/:commentId
 * @desc    Remove comment from post
 * @access  Private
 */
router.get("/posts/comment/:id/:commentId", middleware, deleteComment);

module.exports = router;
