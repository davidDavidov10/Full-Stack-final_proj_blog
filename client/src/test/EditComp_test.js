import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import {addNewPost, editPost} from "../utils/server/Posts";

class EditComp_test extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title:"title",
            content:"new1 post",
        }
    }
    handlePostTitle =(event) =>{
        this.setState({
            title: event.target.value
        })
    }
    handleEditorChange = (content, editor) => {
        this.setState({content:content})
        console.log('Content was updated:', content);
    }

    handleEditPost= ()=>{
        if (this.props.user.isLoggedIn){
                addNewPost(this.state)
                    .then((res)=>{
                        console.log("added post")
                    })
                    .catch(()=>{
                        console.log("server error")
                    });
        }
        else {
            console.log("not logged in ")
        }
    }
    render(){
        return (
            <div className="New-Post">
                <h1>Create new post</h1>
                <textarea
                    className="new-post-title"
                    placeholder="Title.."
                    value={this.state.title}
                    onChange={this.handlePostTitle}/>
                <br/>


                <Editor
                    apiKey='c6tofwg98h3l1ncwn5r8eugb9w3bwaha5542p2qaqfma2d7j'
                    initialValue={this.state.content}
                    init={{
                        height: 300,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={this.handleEditorChange}
                />
                <button className="save-post" onClick={this.handleEditPost}>save post</button>
            </div>
        );
    }
}

export default EditComp_test;





