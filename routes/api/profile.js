const express = require("express");
const router = express.Router();
const passport = require("passport");
const middleware = passport.authenticate("jwt", { session: false });

// Controllers
const {
    allProfiles,
    createAndUpdateProfile,
    createProfileEducation,
    createProfileExperience,
    deleteProfileEducation,
    deleteProfileExperience,
    deleteProfile,
    profileByUserId,
    profileByUserHandle,
    userProfile,
} = require("../../controllers/Profile");

/**
 * @route   GET api/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get("/profile", middleware, userProfile);

/**
 * @route   GET api/profile/all
 * @desc    Get all profiles
 * @access  Public
 */
router.get("/profile/all", allProfiles);

/**
 * @route   GET api/profile/handle/:handle
 * @desc    Get profile by handle
 * @access  Public
 */
router.get("/profile/handle/:handle", profileByUserHandle);

module.exports = router;

/**
 * @route   GET api/profile/user/:userId
 * @desc    Get profile by user ID
 * @access  Public
 */
router.get("/profile/user/:userId", profileByUserId);

/**
 * @route   POST api/profile
 * @desc    Create or update user profile
 * @access  Private
 */
router.post("/profile", middleware, createAndUpdateProfile);

/**
 * @route   POST api/profile/experience
 * @desc    Add experience to profile
 * @access  Private
 */
router.post("/profile/experience", middleware, createProfileExperience);

/**
 * @route   POST api/profile/education
 * @desc    Add education to profile
 * @access  Private
 */
router.post("/profile/education", middleware, createProfileEducation);

/**
 * @route   DELETE api/profile/education/:educationId
 * @desc    Delete experience from profile
 * @access  Private
 */
router.delete(
    "/profile/education/:educationId",
    middleware,
    deleteProfileEducation
);

/**
 * @route   DELETE api/profile/experience/:experienceId
 * @desc    Delete experience from profile
 * @access  Private
 */
router.delete(
    "/profile/experience/:experienceId",
    middleware,
    deleteProfileExperience
);

/**
 * @route   DELETE api/profile
 * @desc    Delete user and profile
 * @access  Private
 */
router.delete("/profile", middleware, deleteProfile);
