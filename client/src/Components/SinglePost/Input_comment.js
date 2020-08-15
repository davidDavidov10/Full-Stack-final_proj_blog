import React from "react";
import {addComment} from "../../utils/server/Comments";

class Input_comment extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            newComment:null,
        }
    }
    handleSubmitComment=()=> {
        console.log("1")
        if (this.props.user.isLoggedIn) {
            let dataToSend = {
                postId: this.props.post.id,
                content: this.state.newComment,
                user_name: this.props.user.name
            }
            addComment(dataToSend)
                .then((res)=>{
                    this.props.setComments(res.data)
                })
                .catch(()=>{
                    this.setState({resp:"Something went wrong, try again please."})
                });


        }else{
            this.setState({errMsg:'You should Login first'})
        }
    }
    handleComment=(event)=>{
        this.setState({
            newComment: event.target.value
        })
    }
    render() {
        return (
            <div className="input_comment">
                <textarea type="text" className="commentInput" placeholder="Join the conversation.." onChange={this.handleComment}/>
                <button className="save_comment" onClick={this.handleSubmitComment}>save comment</button>
                <p className="err"style={{color:"red"}}>{this.props.errMsg}</p>
            </div>
        );
    }
}

export default Input_comment;

