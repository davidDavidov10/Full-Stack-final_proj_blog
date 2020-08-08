import React from 'react';
import {getPost} from "../utils/server/Posts";
import EditPostForm from '../Components/EditPostForm';
import '../styles/NewPostPage.css';
import {checkLogin} from "../utils/server/User";


class EditPostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            post:null
        }
    }
    setPost=(data)=>{
        this.setState({post:data})
    }

    componentDidMount() {
        const postId = this.props.match.params.id
        getPost(postId)
            .then((res)=>{
                this.setState({post:res.data})
            })
            .catch(()=>{

            });
    }
    render(){
        if(this.state.post){
            return (
                <div>
                    <EditPostForm user={this.props.user}
                                  post = {this.state.post}
                                  newPost={false}/>
                </div>
            );
        }
        else{
            return(<div>Loading Post..</div>)
        }
    }
}

export default EditPostPage;





