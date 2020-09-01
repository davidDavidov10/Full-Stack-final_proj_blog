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
        if(this.props.user.isLoggedIn){
            return (
                <div>
                    <EditPostForm {...this.props}
                                  post={this.post}
                                  newPost={true}/>
                </div>
            );
        }else{
            return(<div>you should Login first</div>);
        }

    }
}

export default NewPostPage;





