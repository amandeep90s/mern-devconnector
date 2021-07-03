import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEducation } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

const initialState = {
    school: "",
    degree: "",
    fieldOfStudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
    disabled: false,
};

const AddEducation = ({ history }) => {
    const [state, setState] = useState(initialState);

    const dispatch = useDispatch();

    const { errors } = useSelector((state) => ({ ...state }));

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            school: state.school,
            degree: state.degree,
            fieldOfStudy: state.fieldOfStudy,
            from: state.from,
            to: state.to,
            current: state.current,
            description: state.description,
        };

        dispatch(addEducation(data, history));
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
                        <h4>Add Education</h4>
                        <Link to="/dashboard" className="btn btn-primary">
                            Go Back
                        </Link>
                    </div>
                    <p className="lead my-4 text-center">
                        Add any school, bootcamp etc that you have attended
                    </p>
                    <small className="d-block pb-3">* = required fields</small>

                    <form onSubmit={handleSubmit}>
                        <TextFieldGroup
                            placeholder="* School"
                            name="school"
                            value={state.school}
                            onChange={handleChange}
                            error={errors.school}
                        />

                        <TextFieldGroup
                            placeholder="* Degree or Certification"
                            name="degree"
                            value={state.degree}
                            onChange={handleChange}
                            error={errors.degree}
                        />

                        <TextFieldGroup
                            placeholder="* Field os Study"
                            name="fieldOfStudy"
                            value={state.fieldOfStudy}
                            onChange={handleChange}
                            error={errors.fieldOfStudy}
                        />

                        <h6>From Date</h6>
                        <TextFieldGroup
                            type="date"
                            name="from"
                            value={state.from}
                            onChange={handleChange}
                            error={errors.from}
                        />

                        <h6>To Date</h6>
                        <TextFieldGroup
                            type="date"
                            name="to"
                            value={state.to}
                            onChange={handleChange}
                            disabled={state.disabled ? "disabled" : ""}
                            error={errors.to}
                        />

                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                name="current"
                                id="current"
                                className="form-check-input"
                                value={state.current}
                                checked={state.current}
                                onChange={handleCheck}
                            />
                            <label
                                htmlFor="current"
                                className="form-check-label"
                            >
                                Current Studying
                            </label>
                        </div>

                        <TextAreaFieldGroup
                            placeholder="Program Description"
                            name="description"
                            value={state.description}
                            onChange={handleChange}
                            error={errors.description}
                            info="Tell use about the program that you were in"
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

export default AddEducation;
