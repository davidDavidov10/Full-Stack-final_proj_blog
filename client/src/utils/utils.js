import React from 'react';
import {Link} from "react-router-dom";



const makePosts =(posts)=>{
    console.log(posts);
    let postsListJSXs = posts.map(function(post) {
        let profileImg = post.img ? post.img:"https://udir-blog-avatar.s3.amazonaws.com/avatar.png"
        console.log(post.user_image)
        return(
            <div className="post">
                <div className="post-title">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                </div>
                    <img className="post-image" src={profileImg} width="90" height="90"/>
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

