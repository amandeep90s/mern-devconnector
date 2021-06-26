// Load Post Model
const Post = require("../models/Post");
// Load Profile Model
const Profile = require("../models/Profile");

// Load validation
const validatePostInput = require("../validation/post");

/**
 * Get all posts
 */
exports.getPosts = (req, res) => {
    Post.find()
        .sort({ createdAt: -1 })
        .then((posts) => res.json(posts))
        .catch(() => res.status(404).json({ noPostFound: "No posts found" }));
};

/**
 * Get post by id
 */
exports.getPostById = (req, res) => {
    Post.findById(req.params.id)
        .then((post) => res.json(post))
        .catch(() =>
            res.status(404).json({ noPostFound: "No post found with that ID" })
        );
};

/**
 * Create post
 */
exports.createPost = (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);
    // check validation
    if (!isValid) {
        // if any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
    });

    newPost.save().then((post) => res.json(post));
};

/**
 * Delete post
 */
exports.deletePost = (req, res) => {
    Profile.findOne({ user: req.user.id }).then((profile) => {
        Post.findById(req.params.id)
            .then((post) => {
                // check your post owner
                if (post.user.toString() !== req.user.id) {
                    return res
                        .status(401)
                        .json({ notAuthorized: "User not authorized" });
                }

                // delete
                post.remove().then(() => res.json({ success: true }));
            })
            .catch(() =>
                res.status(404).json({ postNotFound: "No post found" })
            );
    });
};

/**
 * Like post
 */
exports.likePost = (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
        Post.findById(req.params.id)
            .then((post) => {
                if (
                    post.likes.filter(
                        (like) => like.user.toString() === req.user.id
                    ).length > 0
                ) {
                    return res.status(400).json({
                        alreadyLiked: "User already liked this post",
                    });
                }

                // add user id to like array
                post.likes.unshift({ user: req.user.id });
                post.save().then((post) => res.json(post));
            })
            .catch(() =>
                res.status(404).json({ postNotFound: "No post found" })
            );
    });
};

/**
 * Unlike post
 */
exports.unlikePost = (req, res) => {
    Profile.findOne({ user: req.user.id }).then(() => {
        Post.findById(req.params.id)
            .then((post) => {
                if (
                    post.likes.filter(
                        (like) => like.user.toString() === req.user.id
                    ).length === 0
                ) {
                    return res.status(400).json({
                        notLiked: "You have not yet liked this post",
                    });
                }

                // get remove index
                const removeIndex = post.likes
                    .map((item) => item.user.toString())
                    .indexOf(req.user.id);

                // splice out of array
                post.likes.splice(removeIndex, 1);

                // save
                post.save().then((post) => res.json(post));
            })
            .catch(() =>
                res.status(404).json({ postNotFound: "No post found" })
            );
    });
};

/**
 * Create comment
 */
exports.createComment = (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // check validation
    if (!isValid) {
        // if any errors, send 400 with errors object
        return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
        .then((post) => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id,
            };

            // add to comments array
            post.comments.unshift(newComment);

            // save
            post.save().then((post) => res.json(post));
        })
        .catch(() => res.status(404).json({ postNotFound: "No post found" }));
};

/**
 * Delete comment
 */
exports.deleteComment = (req, res) => {
    Post.findById(req.params.id)
        .then((post) => {
            // check to see if comment exists
            if (
                post.comments.filter(
                    (comment) =>
                        comment._id.toString() === req.params.comment_id
                ).length === 0
            ) {
                return res
                    .status(404)
                    .json({ commentNotExists: "Comment does not exist" });
            }

            // get remove index
            const removeIndex = post.comments
                .map((item) => item._id.toString())
                .indexOf(req.params.comment_id);

            // splice comment out of array
            post.comments.splice(removeIndex, 1);

            post.save().then((post) => res.json(post));
        })
        .catch(() => res.status(404).json({ postNotFound: "No post found" }));
};
