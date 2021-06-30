import axios from "axios";

import {
    ADD_POST,
    GET_ERRORS,
    CLEAR_ERRORS,
    GET_POSTS,
    GET_POST,
    POST_LOADING,
    DELETE_POST,
} from "./constants";

// add post
export const addPost = (postData) => (dispatch) => {
    dispatch(clearErrors());

    axios
        .post(`${process.env.REACT_APP_API_URL}/posts`, postData)
        .then((res) =>
            dispatch({
                type: ADD_POST,
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

// get posts
export const getPosts = () => (dispatch) => {
    dispatch(setPostLoading());

    axios
        .get(`${process.env.REACT_APP_API_URL}/posts`)
        .then((res) =>
            dispatch({
                type: GET_POSTS,
                payload: res.data,
            })
        )
        .catch(() =>
            dispatch({
                type: GET_POSTS,
                payload: null,
            })
        );
};

// get post
export const getPost = (id) => (dispatch) => {
    dispatch(setPostLoading());

    axios
        .get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
        .then((res) =>
            dispatch({
                type: GET_POST,
                payload: res.data,
            })
        )
        .catch(() =>
            dispatch({
                type: GET_POST,
                payload: null,
            })
        );
};

// delete post
export const deletePost = (id) => (dispatch) => {
    dispatch(setPostLoading());

    axios
        .delete(`${process.env.REACT_APP_API_URL}/posts/${id}`)
        .then(() =>
            dispatch({
                type: DELETE_POST,
                payload: id,
            })
        )
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

// add like
export const addLike = (id) => (dispatch) => {
    axios
        .post(`${process.env.REACT_APP_API_URL}/posts/like/${id}`)
        .then(() => dispatch(getPosts()))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

// remove like
export const removeLike = (id) => (dispatch) => {
    axios
        .post(`${process.env.REACT_APP_API_URL}/posts/unlike/${id}`)
        .then(() => dispatch(getPosts()))
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data,
            })
        );
};

// add comment
export const addComment = (postId, commentData) => (dispatch) => {
    dispatch(clearErrors());

    axios
        .post(
            `${process.env.REACT_APP_API_URL}/posts/comment/${postId}`,
            commentData
        )
        .then((res) =>
            dispatch({
                type: GET_POST,
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

// delete comment
export const deleteComment = (postId, commentId) => (dispatch) => {
    axios
        .delete(
            `${process.env.REACT_APP_API_URL}/posts/comment/${postId}/${commentId}`
        )
        .then((res) =>
            dispatch({
                type: GET_POST,
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

// set loading state
export const setPostLoading = () => {
    return {
        type: POST_LOADING,
    };
};

// clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};
