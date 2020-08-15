import React from "react";

import Post from "../Components/SinglePost/Post";
import Comments from "../Components/SinglePost/Comments";

import '../styles/SinglePostPage.css';
import {getPost} from "../utils/server/Posts";

class SinglePostPage extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments:null
        }
        const post = null
    }
    componentDidMount() {
        let postId = this.props.match.params.id
        getPost(postId)
            .then((res)=>{
                this.post = res.data;
                this.setState({comments:res.data.comments})

            })
            .catch(()=>{

            });
    }

    setComments=(newComment)=>{
        console.log("setComments")
        this.setState({comments:[newComment, ...this.state.comments]})
        console.log(this.state.comments)
    }

    render(){
        console.log("render PAGE")
        console.log(this.state.comments)
        if (this.post){
            return (
                <div className="SinglePost">
                    <Post  post ={this.post} {...this.props} setComments={this.setComments}/>
                    <Comments comments = {this.state.comments} {...this.props}/>
                </div>
            );
        }else{
            return null
        }

        }
}

export default SinglePostPage;