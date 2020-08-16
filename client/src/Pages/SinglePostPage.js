import React from "react";

import Post from "../Components/SinglePost/Post";
import Comments from "../Components/SinglePost/Comments";

import '../styles/SinglePostPage.css';
import {getPost} from "../utils/server/Posts";

class SinglePostPage extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments:null,
            likes:null
        }
        const post = null
    }
    componentDidMount() {
        let postId = this.props.match.params.id
        getPost(postId)
            .then((res)=>{
                this.post = res.data;
                this.setState({
                    comments:res.data.comments,
                    likes: res.data.likes
                })

            })
            .catch(()=>{

            });
    }

    setComments=(newComment)=>{
        this.setState({comments:[newComment, ...this.state.comments]})
    }
    addLikes=(newLike)=>{
        this.setState({likes:[newLike,...this.state.likes]})
    }

    render(){
        if (this.post && this.props.user.id){
            return (
                <div className="SinglePost">
                    <Post   {...this.props} post={this.post} setComments={this.setComments} addLikes = {this.addLikes}/>
                    <Comments  {...this.props} comments = {this.state.comments}/>
                </div>
            );
        }else{
            return null
        }

        }
}

export default SinglePostPage;