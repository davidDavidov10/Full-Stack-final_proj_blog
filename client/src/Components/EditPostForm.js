import React,{Component} from 'react';

import {addNewPost, editPost} from '../utils/server/Posts'

class EditPostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:props.post.title,
            content:props.post.content,
            resp:null
        }
    }
    handlePostTitle =(event) =>{
        this.setState({
            title: event.target.value
        })
    }
    handlePostContent =(event) =>{
        this.setState({
            content: event.target.value
        })
    }

    handleEditPost= ()=>{
        if (this.props.user.isLoggedIn){
            if(this.props.newPost){
                addNewPost(this.state)
                    .then((res)=>{
                        this.props.history.push(`post/${res.data.id}`)
                })
                    .catch(()=>{
                        this.setState({resp:"Something went wrong, try again please."})
                    });
            }
            else{
                let post = this.props.post
                post.title = this.state.title
                post.content = this.state.content
                editPost(post)
                    .then((res)=>{
                        this.props.history.push(`post/${res.data.id}`)
                        // this.setState({resp:"Post Edited!"})
                    })
                    .catch(()=>{
                        this.setState({resp:"Something went wrong, try again please."})
                    });
            }
        }
        else {
            this.setState({resp:"Must log in first!"})
        }
    }
    render(){
        if (this.state){
            return (
                <div>
                    <section className="new-post-section">
                        <h1>Create new post</h1>
                            <textarea
                                   className="new-post-title"
                                   placeholder="Title.."
                                   value={this.state.title}
                                   onChange={this.handlePostTitle}/>
                            <br/>
                            <textarea
                                   className="new-post-content"
                                   placeholder="content.."
                                   value={this.state.content}
                                   onChange={this.handlePostContent}/>
                            <br/>
                            <button className="save-post" onClick={this.handleEditPost}>save post</button>
                        {this.state.resp ? <p className="server-response" >{this.state.resp}</p>:null}
                    </section>
                </div>
            );
        }
        else{
            return(<div>Loading Post...</div>);
        }
    }
}
export default EditPostForm;


