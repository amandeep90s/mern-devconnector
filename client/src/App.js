import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { clearCurrentProfile } from "./actions/profileActions";
// css
import "./App.css";
// private route
import PrivateRoute from "./components/common/PrivateRoute";
// components
const Footer = lazy(() => import("./components/layout/Footer"));
const Navbar = lazy(() => import("./components/layout/Navbar"));
const Landing = lazy(() => import("./components/layout/Landing"));
const Register = lazy(() => import("./components/auth/Register"));
const Login = lazy(() => import("./components/auth/Login"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const CreateProfile = lazy(() =>
    import("./components/create-profile/CreateProfile")
);
const EditProfile = lazy(() => import("./components/edit-profile/EditProfile"));
const AddExperience = lazy(() =>
    import("./components/add-credentials/AddExperience")
);
const AddEducation = lazy(() =>
    import("./components/add-credentials/AddEducation")
);
const Profiles = lazy(() => import("./components/profiles/Profiles"));
const Profile = lazy(() => import("./components/profile/Profile"));
const Posts = lazy(() => import("./components/posts/Posts"));
const Post = lazy(() => import("./components/post/Post"));
const NotFound = lazy(() => import("./components/not-found/NotFound"));

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // check for token
        if (localStorage.jwtToken) {
            // set auth token header auth
            setAuthToken(localStorage.jwtToken);
            // decode token and get user info and exp
            const decoded = jwt_decode(localStorage.jwtToken);
            // set user and isAuthenticated
            dispatch(setCurrentUser(decoded));

            // check for expired token
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                // logout user
                dispatch(logoutUser());
                // clear current profile
                dispatch(clearCurrentProfile());
                // redirect to login
                window.location.href = "./login";
            }
        }
    }, [dispatch]);

    return (
        <Suspense
            fallback={
                <div className="col text-center p-5">
                    __ Mern Dev Connector __
                </div>
            }
        >
            <div className="App">
                <Navbar />
                <Route exact path="/" component={Landing} />
                <div className="container mb-5">
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute
                            exact
                            path="/dashboard"
                            component={Dashboard}
                        />
                        <Route exact path="/profiles" component={Profiles} />
                        <Route
                            exact
                            path="/profile/:handle"
                            component={Profile}
                        />
                        <PrivateRoute
                            exact
                            path="/create-profile"
                            component={CreateProfile}
                        />
                        <PrivateRoute
                            exact
                            path="/edit-profile"
                            component={EditProfile}
                        />
                        <PrivateRoute
                            exact
                            path="/add-experience"
                            component={AddExperience}
                        />
                        <PrivateRoute
                            exact
                            path="/add-education"
                            component={AddEducation}
                        />
                        <PrivateRoute exact path="/feed" component={Posts} />
                        <PrivateRoute exact path="/post/:id" component={Post} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
                <Footer />
            </div>
        </Suspense>
    );
};

export default App;
