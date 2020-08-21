import AutorButtons from "./AutorButtons";
import React from "react";
import parse from 'html-react-parser';

const  PostBody=(props)=>{
    let content = parse(props.post.content)
    let profileImg= props.post.img ? props.post.img :"https://udir-blog-avatar.s3.amazonaws.com/avatar.png"
    return (
        <div className="postBody">
            <img src={profileImg} className="postPic" alt="user Pic"/>
        <div className="postContent">

            <div className="postHeader">
                <h4 className="postAuthor" >{props.post.author_name}</h4>
                <span className="publishDate">{props.post.published_at}</span>
            </div>
            <h2 className= "postTitle" >{props.post.title}</h2>
            <div className= "postText">{content}</div>
            {props.user.isLoggedIn
                ?
                <AutorButtons {...props}/>
                :null
            }
        </div>
    </div>
    );
}
export default PostBody;