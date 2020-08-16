import React from 'react';
import {addComment} from "../../utils/server/Comments";

import PostBody from "./PostBody";
import Input_comment from "./Input_comment"
import {getPost} from "../../utils/server/Posts";

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            liked:false,
            errMsg:''
        }
    }
    like_unlikeAction=()=>{
        this.setState()
    }

    render() {
        return (
            <section className="post">
                <PostBody {...this.props} />
                <Input_comment {...this.props}/>
            </section>
        );
    }
}

export default Post;





