import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { useSelector } from "react-redux";
import { registerUser } from "../../actions/authActions";

const Register = ({ history }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const { auth, errors } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (auth.isAuthenticated) history.push("/dashboard");
    }, [auth, history]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = { name, email, password, password2 };
        dispatch(registerUser(newUser, history));
    };

    return (
        <div className="register mb-5">
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">
                            Create your DevConnector account
                        </p>

                        <form noValidate onSubmit={handleSubmit}>
                            <TextFieldGroup
                                placeholder="Name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={errors.name}
                            />

                            <TextFieldGroup
                                placeholder="Email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={errors.email}
                                info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                            />

                            <TextFieldGroup
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password}
                            />

                            <TextFieldGroup
                                placeholder="Confirm Password"
                                name="password2"
                                type="password"
                                value={password2}
                                onChange={(e) => setPassword2(e.target.value)}
                                error={errors.password2}
                            />

                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
