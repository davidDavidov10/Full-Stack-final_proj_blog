import React from "react";
import {getAllPostsByUser} from "../utils/server/Posts";
import {makePosts} from "../utils/utils";
import {Link} from "react-router-dom";

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
                        {this.state.userPosts.length !== 0 ? makePosts(this.state.userPosts):
                            <div>
                                <p>no posts...</p>
                                <p>you can create one by clicking <Link to="/new post">here</Link></p>
                            </div>
                        }
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