import React from 'react';
import {Link} from "react-router-dom";
import parse from 'html-react-parser';

const makePosts =(posts)=>{
    let postsListJSXs = posts.map(function(post) {
        let profileImg = post.img ? post.img:"https://udir-blog-avatar.s3.amazonaws.com/avatar.png"
        let  content = parse(`${post.content}`)
        return(
            <div className="post">
            <div className="postBody">
            <img src={profileImg} className="postPic" alt="user Pic" width="90" height="90"/>
            <div className="postContent">

                <div className="postHeader">
                    <h2><Link to={`/post/${post.id}`} className= "postTitle">{post.title}</Link></h2>
                </div>
                <div className= "postText">{content}</div>

                <label>Published at {post.published_at} by <span className="postAuthor" >{post.author_name}</span></label>
            </div>
        </div>
        </div>
                );

    });
    return postsListJSXs;
}

const makeComments=(comments)=>{
    var commentsListJSXs = comments.map(function(comment){
        comment.img = comment.img ? comment.img : "https://udir-blog-avatar.s3.amazonaws.com/avatar.png"
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