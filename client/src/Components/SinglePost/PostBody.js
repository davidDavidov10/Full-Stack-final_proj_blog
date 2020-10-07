import AutorButtons from "./AutorButtons";
import React from "react";
import parse from 'html-react-parser';
import {makePosts} from "../../utils/utils";
import {Link} from "react-router-dom";

const  PostBody=(props)=>{
    let profileImg= props.post.img ? props.post.img :"https://udir-blog-avatar.s3.amazonaws.com/avatar.png"
    return(
        <div>
            <div className="post">
                <div className="postBody">
                    <img src={profileImg} className="postPic" alt="user Pic" width="90" height="90"/>
                    <div className="postContent">

                        <div className="postHeader">
                            <h2>{props.post.title}</h2>
                        </div>
                        <div className= "postText">{parse(props.post.content)}</div><br/>
                        {props.user.isLoggedIn
                            ?
                            <AutorButtons {...props}/>
                            :null
                        }
                        <label>Published at {props.post.published_at} by <span className="postAuthor" >{props.post.author_name}</span></label>
                    </div>
                </div>
            </div>
         </div>
    );
}
export default PostBody;