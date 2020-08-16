import AutorButtons from "./AutorButtons";
import React from "react";
import parse from 'html-react-parser';

const  PostBody=(props)=>{
    let content = parse(props.post.content)
    return (
        <div className="postBody">
            <img src={props.post.img} className="postPic" alt="user Pic"/>
        <div className="postContent">

            <div className="postHeader">
                <h4 className="postAuthor" >{props.post.author_name}</h4>
                <span className="publishDate">{props.post.published_at}</span>
            </div>

            <h2 className="postTitle">{props.post.title}</h2>
            <div className="postText">{content}</div>

            <AutorButtons {...props}/>
        </div>
    </div>
    );
}
export default PostBody;