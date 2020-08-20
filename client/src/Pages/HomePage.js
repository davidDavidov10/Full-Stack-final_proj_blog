import React, {Component} from 'react';
import MainSection from "../Components/MainSection";
import {getAllPosts} from "../utils/server/Posts";
import {makePosts} from "../utils/utils";
import Sidebar from "../Components/Sidebar";
import SearchBar from "../Components/searchBar";
import '../styles/Home/HomePage.css'

import {doSomething} from "../utils/utils"


export default class HomePage extends Component{
constructor(props) {
        super(props);
        this.state = {
            posts:null,
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
                    .catch(()=>{

                    });
        }

render() {
        if(this.state.posts) {
            let numOfSiderBarPosts = Math.min(this.state.posts.length, 3);
            let latestThree = this.state.posts.slice(0, numOfSiderBarPosts);
            let bestThree = doSomething(this.state.posts)
            console.log("bestThree = ")
            console.log(bestThree)
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
                    <Sidebar LatestPosts={latestThree} pouplatThree={bestThree}/>
                </section>
            );
        }else{
            return (<div>Loading Posts...</div>);
        }
}

}

