import React from 'react';
import EditPostForm from "../Components/EditPostForm";
import '../styles/NewPostPage.css';
import {checkLogin} from "../utils/server/User";


class NewPostPage extends React.Component {
    constructor(props) {
        super(props);

        this.post = {
            title:"",
            content:""
        }
    }

    render(){
        return (
            <div>
                <EditPostForm {...this.props} user={this.props.user}
                             post={this.post}
                             newPost={true}/>
            </div>
        );
    }
}

export default NewPostPage;





