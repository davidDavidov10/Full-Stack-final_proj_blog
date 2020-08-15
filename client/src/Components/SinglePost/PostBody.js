import AutorButtons from "./AutorButtons";
import React from "react";

const  PostBody=(props)=>{
    return (
        <div className="postBody">
        <img src={props.post.img} className="postPic" alt="user Pic"/>
        <div className="postContent">
            <div className="postHeader">
                <h4 className="postAuthor" >{props.post.author_name}</h4>
                <span className="publishDate">{props.post.published_at}</span>
            </div>
            <h2 className="postTitle">{props.post.title}</h2>
            <div className="postText">{props.post.content}</div>
            <AutorButtons {...props}/>
        </div>
    </div>
    );
}
export default PostBody;