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

        if(toAdd){
            this.setState({likes:[userId,...this.state.likes]})

        }else {
            let newLikesList = this.state.likes
            newLikesList.splice(newLikesList.indexOf(userId), 1);
            this.setState({likes: newLikesList});
        }
    }

    render(){
        if (this.post){
            if(this.post.author_id !== this.props.user.id && !this.post.published){
                return (<div>post is not available</div>);
            }
            else {
                return (
                    <div className="SinglePost">
                        <Post post={this.post}
                              likes={this.state.likes}
                              setComments={this.setComments}
                              setLikesIds={this.setLikesIds}
                              {...this.props}/>
                        <Comments  {...this.props} comments={this.state.comments}/>
                    </div>
                );
            }
        }else{
            return (<div>Loading post...</div>);
        }

        }
}

export default SinglePostPage;