import React, {Component} from 'react';
import MainSection from "../Components/MainSection";
import {getAllPosts,getTheMostPopular} from "../utils/server/Posts";
import {makePosts} from "../utils/utils";
import Sidebar from "../Components/Sidebar";
import SearchBar from "../Components/searchBar";
import '../styles/Home/HomePage.css'




export default class HomePage extends Component{
    constructor(props) {
        super(props);
        this.state = {
            posts:null,
            popularPosts:null,
            resultsFromSearch:null,
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
            .then((res) => {
                this.setState({posts: res.data})
            })
            .catch(() => {

            });
        getTheMostPopular()
            .then((res)=>{
                this.setState({popularPosts:res.data})
            });
    }


    render() {
        if(this.state.posts && this.state.popularPosts) {
            let numOfSiderBarPosts = Math.min(this.state.posts.length, 3);
            return (
                <section className="main-section">
                    <div className="post-section">
                        <div className="SearchBar">
                            <SearchBar sendSearchResults={this.showSearchResults} showAll={this.showAll}/>
                        </div>
                        {this.state.waitingForSearchRes ? this.state.resultsFromSearch.length > 0
                            ?
                            <div>{makePosts(this.state.resultsFromSearch)}</div>
                            :
                            <div>No results found...</div>
                            :
                            <MainSection posts={this.state.posts}/>}
                    </div>
                    <Sidebar LatestPosts={this.state.posts.slice(0,numOfSiderBarPosts)} pouplatThree={this.state.popularPosts}/>
                </section>
            );
        }else{
            return (<div>Loading Posts...</div>);
        }
    }

}