import React from 'react';
import  Posts from '../App/Posts'
import SearchBar from "../Components/searchBar"
import {makePosts} from "../utils/utils";


class MainSection extends  React.Component{
constructor(props) {
    super(props);
    this.state = {
        resultsFromSearch:[],
        waitingForSearchRes: false,
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

    render() {
        return (
            <section className="post-section">
                <label className="title">This is my blog</label>
                <div className="posts-list">

                    <SearchBar sendSearchResults={this.showSearchResults} showAll={this.showAll}/>
                    <Posts user={null}/>
                </div>
            </section>
        );
    }
}

export default MainSection;



