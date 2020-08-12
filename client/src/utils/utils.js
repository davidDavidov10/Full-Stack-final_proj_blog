import React from 'react';
import {Link} from "react-router-dom";



const makePosts =(posts)=>{
    var postsListJSXs = posts.map(function(post) {
        post.user_image = "https://udir-blog-avatar.s3.amazonaws.com/avatar.png"
        return(
            <div className="post">
                <div className="post-title">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                </div>
                    <img className="post-image" src={post.user_image} width="90" height="50"/>
                    <p>{post.content}</p>
                    <label className="post-footer">Published at {post.published_at} by {post.author_name}</label>
            </div>
        );
    });
    return postsListJSXs;
}

const makeComments=(comments)=>{
    var commentsListJSXs = comments.map(function(comment){
        return(
            <div className="comment">
                <p>
                    {comment.user_name} said:
                </p>
                <p>
                    {comment.content}
                </p>
                <span>-------</span>
            </div>

        );
    });
    return commentsListJSXs;
}


export
{
    makePosts,
    makeComments,
}

