import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addExperience } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

const initialState = {
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: "",
};

const AddExperience = ({ history }) => {
    const [state, setState] = useState(initialState);
    const dispatch = useDispatch();
    const { errors } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            company: state.company,
            title: state.title,
            location: state.location,
            from: state.from,
            to: state.to,
            current: state.current,
            description: state.description,
        };

        dispatch(addExperience(data, history));
    };

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleCheck = () => {
        setState({
            ...state,
            disabled: !state.disabled,
            current: !state.current,
        });
    };

    return (
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-8">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>Add Experience</h4>

                        <Link to="/dashboard" className="btn btn-primary">
                            Go Back
                        </Link>
                    </div>
                    <p className="lead my-3 text-center">
                        Add any job or position that you have had in the past or
                        current
                    </p>
                    <small className="d-block pb-3">* = required fields</small>

                    <form onSubmit={handleSubmit}>
                        <TextFieldGroup
                            placeholder="* Company"
                            name="company"
                            value={state.company}
                            onChange={handleChange}
                            error={errors.company}
                        />

                        <TextFieldGroup
                            placeholder="* Job Title"
                            name="title"
                            value={state.title}
                            onChange={handleChange}
                            error={errors.title}
                        />

                        <TextFieldGroup
                            placeholder="Location"
                            name="location"
                            value={state.location}
                            onChange={handleChange}
                            error={errors.location}
                        />

                        <h6>From Date</h6>
                        <TextFieldGroup
                            name="from"
                            type="date"
                            value={state.from}
                            onChange={handleChange}
                            error={errors.from}
                        />

                        <h6>To Date</h6>
                        <TextFieldGroup
                            name="to"
                            type="date"
                            value={state.to}
                            onChange={handleChange}
                            error={errors.to}
                            disabled={state.disabled ? "disabled" : ""}
                        />

                        <div className="form-check mb-4">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="current"
                                value={state.current}
                                checked={state.current}
                                onChange={handleCheck}
                                id="current"
                            />

                            <label
                                htmlFor="current"
                                className="form-check-label"
                            >
                                Current Job
                            </label>
                        </div>

                        <TextAreaFieldGroup
                            placeholder="Job Description"
                            name="description"
                            value={state.description}
                            onChange={handleChange}
                            error={errors.description}
                            info="Tell us about the the position"
                        />

                        <div className="d-grid mt-4">
                            <button type="submit" className="btn btn-info">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddExperience;
