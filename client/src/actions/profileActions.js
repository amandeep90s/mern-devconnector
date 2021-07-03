import axios from "axios";

import {
    CLEAR_CURRENT_PROFILE,
    GET_ERRORS,
    CLEAR_ERRORS,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    SET_CURRENT_USER,
} from "./constants";

// get current profile
export const getCurrentProfile = () => (dispatch) => {
    dispatch(setProfileLoading());

    axios
        .get(`${process.env.REACT_APP_API_URL}/profile`)
        .then((res) =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            })
        )
        .catch(() =>
            dispatch({
                type: GET_PROFILE,
                payload: {},
            })
        );
};

// get profile by  handle
export const getProfileByHandle = (handle) => (dispatch) => {
    dispatch(setProfileLoading());

    axios
        .get(`${process.env.REACT_APP_API_URL}/profile/handle/${handle}`)
        .then((res) =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            })
        )
        .catch(() =>
            dispatch({
                type: GET_PROFILE,
                payload: null,
            })
        );
};

// create profile
export const createProfile = (profileData, history) => (dispatch) => {
    dispatch(clearErrors());

    axios
        .post(`${process.env.REACT_APP_API_URL}/profile`, profileData)
        .then(() => history.push("/dashboard"))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

// add experience
export const addExperience = (expData, history) => (dispatch) => {
    dispatch(clearErrors());

    axios
        .post(`${process.env.REACT_APP_API_URL}/profile/experience`, expData)
        .then(() => history.push("/dashboard"))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

// add education
export const addEducation = (eduData, history) => (dispatch) => {
    dispatch(clearErrors());

    axios
        .post(`${process.env.REACT_APP_API_URL}/profile/education`, eduData)
        .then(() => history.push("/dashboard"))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

// delete experience
export const deleteExperience = (id) => (dispatch) => {
    axios
        .delete(`${process.env.REACT_APP_API_URL}/profile/experience/${id}`)
        .then((res) =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            })
        )
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};
// delete education
export const deleteEducation = (id) => (dispatch) => {
    axios
        .delete(`${process.env.REACT_APP_API_URL}/profile/education/${id}`)
        .then((res) =>
            dispatch({
                type: GET_PROFILE,
                payload: res.data,
            })
        )
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};
// get all profiles
export const getProfiles = () => (dispatch) => {
    dispatch(setProfileLoading());

    axios
        .get(`${process.env.REACT_APP_API_URL}/profile/all`)
        .then((res) =>
            dispatch({
                type: GET_PROFILES,
                payload: res.data,
            })
        )
        .catch(() =>
            dispatch({
                type: GET_PROFILES,
                payload: null,
            })
        );
};

// delete account & profile
export const deleteAccount = () => (dispatch) => {
    if (window.confirm("Are you sure? This can't be undone!")) {
        axios
            .delete(`${process.env.REACT_APP_API_URL}/profile`)
            .then((res) =>
                dispatch({
                    type: SET_CURRENT_USER,
                    payload: {},
                })
            )
            .catch((err) =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data,
                })
            );
    }
};

// profile loading
export const setProfileLoading = () => {
    return {
        type: PROFILE_LOADING,
    };
};

// clear profile
export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE,
    };
};

// clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
