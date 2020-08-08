import React from "react";
import {Link} from "react-router-dom";
import {getPost,deletePost,changePostPhase} from "../utils/server/Posts"
import {addComment} from "../utils/server/Comments"
import {makeComments} from "../utils/utils"

import '../styles/SinglePostPage.css';

class SinglePostPage extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            comments:null,
            newComment:null,
            userWantToComment : false,
            userComment:false,
            resp:null,
            publishButton:null
        }
    }

    componentDidMount() {
        let postId = this.props.match.params.id
        getPost(postId)
            .then((res)=>{
                this.setState({
                    post:res.data,
                    publishButton: res.data.published ? "un-publish" : "publish",
                    comments:res.data.comments,})
            })
            .catch(()=>{
                this.setState({resp:"Something went wrong, try again please."})
            });
    }
    handleDelete=()=>{
        deletePost(this.state.post)
            .then((res)=>{
                this.setState({resp:"Post Deleted!"})
            })
            .catch(()=>{
                this.setState({resp:"Something went wrong, try again please."})
            });
    }
    handleComment=(event)=>{
        this.setState({
            newComment: event.target.value
        })
    }
    handleSubmitComment=()=>{
        let dataToSend = {
            postId : this.state.post.id,
            content: this.state.newComment,
            user_name: this.props.user.name
        }
        addComment(dataToSend,this.handleResp)
        this.setState({comments:[dataToSend,...this.state.comments]});
    }
    changeClickState=()=>{
        this.setState({userWantToComment:!this.state.userWantToComment});
    }
    postPhases=()=>{
        if(this.state.post.published){
            changePostPhase(this.state.post,)
                .then((res)=>{
                    this.setState({publishButton:"publish"})
                })
                .catch(()=>{

                });

        }else{
            changePostPhase(this.state.post)
                .then((res)=>{
                    this.setState({publishButton:"un-publish"})
                })
                .catch(()=>{
                });
        }
    }
    render(){
        if (this.state.post) {
            return (
                <div>
                    <div className="post-page-section">
                        <h1>{this.state.post.title}</h1>
                        <span className="post-content">{this.state.post.content}</span>
                    </div>
                        <section className="comments-section">
                            <h2>Comments</h2>
                            {this.state.comments.length != 0
                                ? <div>{makeComments(this.state.comments)}</div>
                                : <span>be the first one to comment!</span>
                            }
                            <br/>
                            {this.props.user.isLoggedIn ?
                                (this.state.userWantToComment
                                        ? <p>
                                            <button onClick={this.changeClickState}>close comment text box</button>
                                            <button onClick={this.handleSubmitComment}>save comment</button>
                                            <br/>
                                            <textarea
                                                className="comment-box"
                                                placeholder="comment here"
                                                onChange={this.handleComment}/>
                                        </p>
                                        :
                                        <p>
                                            <button onClick={this.changeClickState}>open comment text box</button>
                                            <br/>
                                        </p>
                                )
                                :<Link to="/login"><button>Login first if you want to comment</button></Link>
                            }
                        </section>
                        {this.state.post.author_id == this.props.user.id
                            ?
                            <section className="author-section">
                                <p>-------Buttons if you are the author--------</p>
                                <Link to={`/post/${this.state.post.id}/edit`}><button>Edit Post</button><br/></Link>
                                <button onClick={this.handleDelete}>Delete Post</button><br/>
                                <button onClick={this.postPhases}>{this.state.publishButton}</button>
                            </section>
                            : null
                        }
                </div>);
        }
        else{
            return(
                <div>
                    loading Post...
                </div>);
        }
    }
}

export default SinglePostPage;