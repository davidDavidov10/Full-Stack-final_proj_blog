import React from 'react';
import {makePosts} from "../utils/utils";
import {getAllPosts, getAllPostsByUser} from "../utils/server/Posts";
import SearchBar from "../Components/searchBar";
import "../styles/searchBarstyle.css"


class Posts extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],

        }
    }

    componentDidMount(){
        if (this.props.user){
            getAllPostsByUser()
                .then((res)=>{
                    this.setState({posts:res.data})
                })
                .catch(()=>{

                });
        }
        else{
            getAllPosts()
                .then((res)=>{
                    this.setState({posts:res.data})
            })
                .catch(()=>{

                });
        }
    }
    render(){
        if (this.state.posts){
                return(
                        <div className="post-section">
                            {makePosts(this.state.posts)}
                        </div>
                );
        }
        else{
            return(
              <div>Loading Posts...</div>
            );
        }
    }
}
export default Posts;