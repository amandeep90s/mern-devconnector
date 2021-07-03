import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../actions/postActions";
import PostForm from "./PostForm";
import PostFeed from "./PostFeed";
import Spinner from "../common/Spinner";

const Posts = () => {
    const dispatch = useDispatch();
    const {
        post: { posts, loading },
    } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    let postContent;
    if (posts === null || loading) {
        postContent = <Spinner />;
    } else {
        postContent = <PostFeed posts={posts} />;
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <PostForm />
                {postContent}
            </div>
        </div>
    );
};

export default Posts;
