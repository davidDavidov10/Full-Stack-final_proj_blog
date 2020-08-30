import React from 'react';


import PostBody from "./PostBody";
import Input_comment from "./Input_comment"
import {getPost} from "../../utils/server/Posts";

class Post extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="singlePost">
                <PostBody {...this.props} />
                <Input_comment {...this.props}/>
            </section>
        );
    }
}

export default Post;





