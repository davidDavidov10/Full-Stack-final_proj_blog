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
            resultsFromSearch:[],
            waitingForSearchRes: false,
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

    showSearchResults=(searchResult)=>{
        this.setState({
            waitingForSearchRes:true,
            resultsFromSearch:searchResult
        });
    }
    showAll=(searchResult)=>{
        this.setState({
            waitingForSearchRes:false,
            resultsFromSearch:[]
        });
    }

    render(){
        if (this.state.posts){
                return(
                        <div className="post-section">
                            <SearchBar sendSearchResults= {this.showSearchResults} showAll={this.showAll}/>
                            {this.state.waitingForSearchRes ?
                                (this.state.resultsFromSearch.length > 0 ?
                                    makePosts(this.state.resultsFromSearch)
                                    : <div>nothing was found... </div>)
                            : makePosts(this.state.posts)}


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