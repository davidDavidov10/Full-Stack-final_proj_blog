import React,{Component} from 'react';
import {addNewPost, editPost} from '../utils/server/Posts'
import {Editor} from "@tinymce/tinymce-react";

class EditPostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:props.post.title,
            content:props.post.content,
            readyForSub:false,
            clicked:false
        }
    }
    componentDidMount() {
        // for edit mode
        this.checkButton();
    }

    handlePostTitle = async (event) =>{
        await this.setState({
            title: event.target.value
        })
        await this.checkButton();
    }

    handleEditorChange = async (content, editor) => {
        await this.setState({content:content});
        await this.checkButton();
    }
    checkButton =()=>{
        if (this.state.title !== '' && this.state.content !== ''){
            this.setState({readyForSub: true});
        }else {
            this.setState({readyForSub: false});
        }
    }

    handleEditPost= ()=>{
        if (this.props.user.isLoggedIn & !this.state.clicked){
            this.setState({clicked:true})
            if(this.props.newPost){
                addNewPost(this.state)
                    .then((res)=>{
                        this.props.history.push(`post/${res.data.id}`)
                    })
                    .catch(()=>{
                        this.setState({clicked:false})
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
                        this.setState({clicked:false})
                    });
            }
        }
        else {

        }
    }
    render(){
        if (this.state){
            return (
                <div>
                    <section className="new-post-section">
                        <h1 style={{textAlign :"center",marginBottom:"2%",marginTop:"0px"}}>Create new post</h1>
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
                                init={{
                                    height: 300,

                                    menubar: false,
                                    resize: false,

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
                                onEditorChange={this.handleEditorChange} />
                        <br/>
                        {this.state.readyForSub ?
                            <button className="savePostButton"
                                    onClick={this.handleEditPost}
                                    style={{border: "1px solid lime"}}>save post</button>
                            :<button className="savePostButton" disabled>save post</button>}

                        {this.state.resp ? <span className="errMsg" >{this.state.resp}</span>:null}
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


