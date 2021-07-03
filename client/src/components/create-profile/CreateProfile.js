import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProfile } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import InputGroup from "../common/InputGroup";
import SelectListGroup from "../common/SelectListGroup";
import {
    FacebookFilled,
    TwitterOutlined,
    LinkedinFilled,
    InstagramFilled,
    YoutubeFilled,
} from "@ant-design/icons";

const initialState = {
    displaySocialInputs: false,
    handle: "",
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    githubUsername: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
};

const CreateProfile = ({ history }) => {
    const [state, setState] = useState(initialState);

    const dispatch = useDispatch();

    const { errors } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const profileData = {
            handle: state.handle,
            company: state.company,
            website: state.website,
            location: state.location,
            status: state.status,
            skills: state.skills,
            githubUsername: state.githubUsername,
            bio: state.bio,
            twitter: state.twitter,
            facebook: state.facebook,
            linkedin: state.linkedin,
            youtube: state.youtube,
            instagram: state.instagram,
        };

        dispatch(createProfile(profileData, history));
    };

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    let socialInputs;

    if (state.displaySocialInputs) {
        socialInputs = (
            <>
                <InputGroup
                    placeholder="Twitter Profile Url"
                    name="twitter"
                    icon={<TwitterOutlined className="text-info" />}
                    value={state.twitter}
                    onChange={handleChange}
                    error={errors.twitter}
                />

                <InputGroup
                    placeholder="Facebook Page Url"
                    name="facebook"
                    icon={<FacebookFilled className="text-primary" />}
                    value={state.facebook}
                    onChange={handleChange}
                    error={errors.facebook}
                />

                <InputGroup
                    placeholder="Linkedin Profile Url"
                    name="linkedin"
                    icon={<LinkedinFilled className="text-primary" />}
                    value={state.linkedin}
                    onChange={handleChange}
                    error={errors.linkedin}
                />

                <InputGroup
                    placeholder="Youtube Channel Url"
                    name="youtube"
                    icon={<YoutubeFilled className="text-danger" />}
                    value={state.youtube}
                    onChange={handleChange}
                    error={errors.youtube}
                />

                <InputGroup
                    placeholder="Instagram Page Url"
                    name="instagram"
                    icon={<InstagramFilled className="text-danger" />}
                    value={state.instagram}
                    onChange={handleChange}
                    error={errors.instagram}
                />
            </>
        );
    }

    // select options for status
    const options = [
        { label: "* Select Professional Status", value: 0 },
        { label: "Developer", value: "Developer" },
        { label: "Junior Developer", value: "Junior Developer" },
        { label: "Senior Developer", value: "Senior Developer" },
        { label: "Manager", value: "Manager" },
        { label: "Student or Learning", value: "Student or Learning" },
        { label: "Instructor or Teacher", value: "Instructor or Teacher" },
        { label: "Intern", value: "Intern" },
        { label: "Other", value: "Other" },
    ];

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                    <h4>Create Your Profile</h4>
                    <p className="lead text-muted">
                        Let&apos;t get some information to make your profile
                        stand out
                    </p>
                    <small className="d-block pb-3">* = required fields</small>

                    <form onSubmit={handleSubmit}>
                        <TextFieldGroup
                            placeholder="* Profile Handle"
                            name="handle"
                            value={state.handle}
                            onChange={handleChange}
                            error={errors.handle}
                            info="A unique handle for your profile url. Your full name, company name, nickname"
                        />

                        <SelectListGroup
                            placeholder="Status"
                            name="status"
                            value={state.status}
                            onChange={handleChange}
                            options={options}
                            error={errors.status}
                            info="Give us an idea of where your are at in your career"
                        />

                        <TextFieldGroup
                            placeholder="Company"
                            name="company"
                            value={state.company}
                            onChange={handleChange}
                            error={errors.company}
                            info="Could be your own company or one you work for"
                        />

                        <TextFieldGroup
                            placeholder="Website"
                            name="website"
                            value={state.website}
                            onChange={handleChange}
                            error={errors.website}
                            info="Could be your own website or a company one"
                        />

                        <TextFieldGroup
                            placeholder="Location"
                            name="location"
                            value={state.location}
                            onChange={handleChange}
                            error={errors.location}
                            info="City or city & state suggested (eg. Pathankot, PB)"
                        />

                        <TextFieldGroup
                            placeholder="* Skills"
                            name="skills"
                            value={state.skills}
                            onChange={handleChange}
                            error={errors.skills}
                            info="Please use comma separated values (eg. HTML,CSS,Javascript,PHP)"
                        />

                        <TextFieldGroup
                            placeholder="Github Username"
                            name="githubUsername"
                            value={state.githubUsername}
                            onChange={handleChange}
                            error={errors.githubUsername}
                            info="If you want your latest repositories and a Github link, include your username"
                        />

                        <TextAreaFieldGroup
                            placeholder="Short Bio"
                            name="bio"
                            value={state.bio}
                            onChange={handleChange}
                            error={errors.bio}
                            info="Tell us a little about yourself"
                        />

                        <div className="my-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setState({
                                        ...state,
                                        displaySocialInputs:
                                            !state.displaySocialInputs,
                                    })
                                }
                                className="btn btn-secondary"
                            >
                                Add Social Network Links
                            </button>
                            <br />
                            <span className="text-muted">Optional</span>
                        </div>
                        {socialInputs}
                        <div className="d-grid">
                            <input
                                type="submit"
                                value="Submit"
                                className="btn btn-info mt-4"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateProfile;
