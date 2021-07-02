import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

const Login = ({ history }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { auth, errors } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (auth.isAuthenticated) history.push("/dashboard");
    }, [auth, history]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password,
        };

        dispatch(loginUser(loginData));
    };

    return (
        <div className="login mb-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 m-auto">
                        <h1 className="display-4 text-center">Log In</h1>
                        <p className="lead text-center">
                            Sign in to your DevConnector account
                        </p>
                        <form onSubmit={handleSubmit}>
                            <TextFieldGroup
                                placeholder="Email Address"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={errors.email}
                            />

                            <TextFieldGroup
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={errors.password}
                            />

                            <div className="d-grid">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
