import React from "react";

import Post from "../Components/SinglePost/Post";
import Comments from "../Components/SinglePost/Comments";

import '../styles/SinglePostPage.css';
import {getPost} from "../utils/server/Posts";
import {getLikeIds, getLikeNames} from "../utils/utils";

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
        console.log("componentDidMount")
        let postId = this.props.match.params.id
        getPost(postId)
            .then((res)=>{
                this.post = res.data;

                this.setState({
                    comments:res.data.comments,
                    likes: getLikeIds(res.data.likes)
                })
            })
            .catch(()=>{

            });
    }

    setComments=(newComment)=>{
        this.setState({comments:[newComment, ...this.state.comments]})
    }

    setLikesIds=(userId,toAdd)=>{
        console.log("setLikesIds")
        if(toAdd){
            this.setState({likes:[userId,...this.state.likes]})
        }else{
            //how to get out one elment from array ??
            const newList = this.state.likes.splice(this.state.likes.indexOf(userId), 1);
            console.log(newList)
            this.setState({likes: newList});
        }

    }

    render(){
        console.log(this.state.likes)
        if (this.post){
            return (
                <div className="SinglePost">
                    <Post post = {this.post}
                          likes = {this.state.likes}
                          setComments = {this.setComments}
                          setLikesIds = {this.setLikesIds}
                          {...this.props}/>
                    <Comments  {...this.props} comments = {this.state.comments}/>
                </div>
            );
        }else{
            return null
        }

        }
}

export default SinglePostPage;