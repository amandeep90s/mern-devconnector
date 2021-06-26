// Load input validation
const validateProfileInput = require("../validation/profile");
const validateEducationInput = require("../validation/education");
const validateExperienceInput = require("../validation/experience");

// Load profile model
const Profile = require("../models/Profile");
// Load user model
const User = require("../models/User");

/**
 * User profile controller
 */
exports.userProfile = (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .populate("user", ["name", "avatar"])
        .then((profile) => {
            if (!profile) {
                errors.noProfile = "There is no profile for this user";
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch((err) => res.status(404).json(err));
};

/**
 * All profile controller
 */
exports.allProfiles = (_, res) => {
    const errors = {};

    Profile.find()
        .populate("user", ["name", "avatar"])
        .then((profiles) => {
            if (!profiles) {
                errors.noProfile = "There are no profiles";
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(() =>
            res.status(404).json({ profile: "There are no profiles" })
        );
};

/**
 * Get profile by user handle controller
 */
exports.profileByUserHandle = (req, res) => {
    const errors = {};

    Profile.findOne({ handle: req.params.handle })
        .populate("user", ["name", "avatar"])
        .then((profile) => {
            if (!profile) {
                errors.noProfile = "There is no profile for this user";
                return res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch((err) => res.status(404).json(err));
};

/**
 * Get profile by user id controller
 */
exports.profileByUserId = (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.params.userId })
        .populate("user", ["name", "avatar"])
        .then((profile) => {
            if (!profile) {
                errors.noProfile = "There is no profile for this user";
                res.status(404).json(errors);
            }
            res.json(profile);
        })
        .catch(() =>
            res
                .status(404)
                .json({ profile: "There is no profile for this user" })
        );
};

/**
 * Create and update profile controller
 */
exports.createAndUpdateProfile = (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // check validation
    if (!isValid) {
        // return any errors with 400 status
        return res.status(400).json(errors);
    }

    // get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.githubUsername)
        profileFields.githubUsername = req.body.githubUsername;
    if (req.body.status) profileFields.status = req.body.status;

    // skills - split into array
    if (typeof req.body.skills !== undefined) {
        profileFields.skills = req.body.skills.split(",");
    }

    // social links
    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

    Profile.findOne({ user: req.user.id }).then((profile) => {
        if (profile) {
            // update
            Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            ).then((profile) => res.json(profile));
        } else {
            // create
            // check if handle exists
            Profile.findOne({ handle: profileFields.handle }).then(
                (profile) => {
                    if (profile) {
                        errors.handle = "That handle already exists";
                        return res.status(400).json(errors);
                    }

                    // save profile
                    new Profile(profileFields)
                        .save()
                        .then((profile) => res.json(profile));
                }
            );
        }
    });
};

/**
 * Create profile experience controller
 */
exports.createProfileExperience = (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body);

    // check validation
    if (!isValid) {
        // return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
        const newExperience = {
            title: req.body.title,
            company: req.body.company,
            location: req.body.location,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        };

        // add to experience array
        profile.experience.unshift(newExperience);
        profile.save().then((profile) => res.json(profile));
    });
};

/**
 * Create profile education controller
 */
exports.createProfileEducation = (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body);

    // Check Validation
    if (!isValid) {
        // Return any errors with 400 status
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then((profile) => {
        const newEducation = {
            school: req.body.school,
            degree: req.body.degree,
            fieldOfStudy: req.body.fieldOfStudy,
            from: req.body.from,
            to: req.body.to,
            current: req.body.current,
            description: req.body.description,
        };

        // add to education array
        profile.education.unshift(newEducation);

        profile.save().then((profile) => res.json(profile));
    });
};

/**
 * Delete profile experience controller
 */
exports.deleteProfileExperience = (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then((profile) => {
            // get remove index
            const removeIndex = profile.experience
                .map((item) => item.id)
                .indexOf(req.params.experienceId);
            // splice out of array
            profile.experience.splice(removeIndex, 1);
            // save
            profile.save().then((profile) => res.json(profile));
        })
        .catch((err) => res.status(404).json(err));
};

/**
 * Delete profile education controller
 */
exports.deleteProfileEducation = (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then((profile) => {
            // get remove index
            const removeIndex = profile.education
                .map((item) => item.id)
                .indexOf(req.params.educationId);
            // splice out of array
            profile.education.splice(removeIndex, 1);
            // save
            profile.save().then((profile) => res.json(profile));
        })
        .catch((err) => res.status(404).json(err));
};

/**
 * Delete profile controller
 */
exports.deleteProfile = (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
        User.findOneAndRemove({ _id: req.user.id }).then(() =>
            res.json({ success: true })
        );
    });
};
