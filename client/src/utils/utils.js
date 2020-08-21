import React from 'react';
import {Link} from "react-router-dom";

import parse from 'html-react-parser';

const makePosts =(posts)=>{
    let postsListJSXs = posts.map(function(post) {
        let profileImg = post.img ? post.img:"https://udir-blog-avatar.s3.amazonaws.com/avatar.png"
        let  content = parse(`${post.content}`)
        return(
            <div className="post">
                <div className="post-title">
                    <Link to={`/post/${post.id}`}>{post.title}</Link>
                </div>
                <img className="post-image" src={profileImg} width="90" height="90"/>
                <p>{content}</p>
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
                <img src={comment.img} className="commentPic" alt="user Pic"/>
                <div className="commentBody">
                    <div className="postHeader">
                        <h4 className="postAuthor" >{comment.user_name}</h4>
                        <span className="publishDate">{comment.published_at}</span>
                    </div>
                    <div className="commentContent">{comment.content}</div>
                </div>
                <hr/>
            </div>

        );
    });
    return commentsListJSXs;
}

const getLikeIds=(likes)=>{
    var likeIds = likes.map(function(like){
        return like.user_id;
    });
    return likeIds
}
const getLikeNames=(likes)=>{
    var likeNames = likes.map(function(like){
        return like.user_name;
    });
    return likeNames
}

export
{
    makePosts,
    makeComments,
    getLikeIds,
    getLikeNames
}