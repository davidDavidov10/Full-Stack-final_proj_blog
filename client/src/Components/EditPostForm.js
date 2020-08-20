import React,{Component} from 'react';

import {addNewPost, editPost} from '../utils/server/Posts'
import {Editor} from "@tinymce/tinymce-react";

class EditPostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:props.post.title,
            content:props.post.content,
        }
    }
    handlePostTitle =(event) =>{
        this.setState({
            title: event.target.value
        })
    }

    handleEditorChange = (content, editor) => {
        this.setState({content:content})
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
                    })
                    .catch(()=>{

                    });
            }
        }
        else {

        }
    }
    render(){
        console.log(this.state)
        if (this.state){
            return (
                <div>
                    <section className="new-post-section">
                        <h1>Create new post</h1>
                        <input
                            type="text"
                            maxLength={50}
                            className="new-post-title"
                            placeholder="Title.."
                            value={this.state.title}
                            onChange={this.handlePostTitle} />
                        <br/>

                        <Editor className="new-post-content"
                                apiKey='c6tofwg98h3l1ncwn5r8eugb9w3bwaha5542p2qaqfma2d7j'
                                initialValue={this.state.content}
                                init={{height: 300, menubar: false,
                                    plugins:
                                        [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                    toolbar:
                                        'undo redo | formatselect | bold italic underline backcolor | link' +
                                        ' lignleft aligncenter alignright alignjustify |' +
                                        ' bullist numlist outdent indent | removeformat | help'
                                }}
                                onEditorChange={this.handleEditorChange}
                        />



                        <br/>
                        <button className="save-post" onClick={this.handleEditPost}>save post</button>
                        {this.state.resp ? <span className="server-response" >{this.state.resp}</span>:null}
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


