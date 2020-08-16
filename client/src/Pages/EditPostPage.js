import React from 'react';
import {getPost} from "../utils/server/Posts";
import EditPostForm from '../Components/EditPostForm';
import '../styles/NewPostPage.css';



class EditPostPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            post:null
        }
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
                    <EditPostForm {...this.props}
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





