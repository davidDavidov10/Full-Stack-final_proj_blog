import React from "react";
import {getAllPostsByUser} from "../utils/server/Posts";
import {makePosts} from "../utils/utils";


class MyPostsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            userPosts:null
        }
    }

    componentDidMount(){
            getAllPostsByUser()
                .then((res)=>{
                    this.setState({userPosts:res.data})
                })
        }

    render() {
        if (this.state.userPosts){
            return (
                <div>
                    <div className ="title">
                        welcome {this.props.user.name} <br/>
                        click on title to edit the post!
                    </div>

                    <div className="post-section">
                        <div className="posts-list">
                        {this.state.userPosts.length !== 0 ? makePosts(this.state.userPosts):
                            <div className="post">
                                <p>no posts...</p>
                        </div>}
                    </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>Loading Posts..</div>
                );
        }

    }
}
export default MyPostsPage;