import React, {Component} from 'react';
import MainSection from "../Components/MainSection";
import {getAllPosts} from "../utils/server/Posts";
import {makePosts,makePosts_test} from "../utils/utils";
import Sidebar from "../Components/Sidebar";
import SearchBar from "../Components/searchBar";

// import '../styles/Home/MainSection.css'
import '../styles/Home/HomePage.css'
//import '../test/PostsSection_Test.css'


export default class HomePage extends Component{
constructor(props) {
        super(props);
        this.state = {
                posts:[],
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
        componentDidMount() {
                getAllPosts()
                    .then((res)=>{
                            this.setState({posts:res.data})
                    })
        }

render() {
        let firstThree = this.state.posts.slice(0, 3);
        console.log(firstThree)
        return (
            <section className="main-section">
                <div className="post-section">
                    <label className="title">
                        <h1>This is my blog</h1>
                    </label>
                    <div className="SearchBar">
                    <SearchBar sendSearchResults={this.showSearchResults} showAll={this.showAll}/>
                    </div>
                    {this.state.waitingForSearchRes? this.state.resultsFromSearch.length > 0
                        ?
                        <div>{makePosts_test(this.state.resultsFromSearch)}</div>
                        :
                        <div>No results found...</div>
                        :
                        <MainSection posts={this.state.posts} />}
                </div>
                <Sidebar LatestPostr={firstThree}/>
            </section>
            );
}

}

