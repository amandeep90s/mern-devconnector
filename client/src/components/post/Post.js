import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPost } from "../../actions/postActions";
import PostItem from "../posts/PostItem";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";
import Spinner from "../common/Spinner";

const Post = ({ match }) => {
    const dispatch = useDispatch();
    const {
        post: { post, loading },
    } = useSelector((state) => ({ ...state }));

    const { id } = match.params;

    useEffect(() => {
        dispatch(getPost(id));
    }, [dispatch, id]);

    let postContent;
    if (post === null || loading || Object.keys(post).length === 0) {
        postContent = <Spinner />;
    } else {
        postContent = (
            <>
                <PostItem post={post} showActions={false} />
                <CommentForm postId={post._id} />
                <CommentFeed postId={post._id} comments={post.comments} />
            </>
        );
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/feed" className="btn btn-primary mb-3">
                        Back To Feed
                    </Link>

                    {postContent}
                </div>
            </div>
        </div>
    );
};

export default Post;
