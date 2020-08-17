import React, {Component} from 'react';
import MainSection from "../Components/MainSection";
import {getAllPosts} from "../utils/server/Posts";
import {makePosts,makePosts_test} from "../utils/utils";
import Sidebar from "../Components/Sidebar";
import SearchBar from "../Components/searchBar";
import '../styles/Home/HomePage.css'


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
        }

render() {
        if(this.state.posts) {
            let latestThree = this.state.posts.slice(0, 3);
            let popularThree = this.state.posts.slice(-1)[0].likes.slice(0, 3)
            return (
                <section className="main-section">
                    <div className="post-section">
                        <div className="SearchBar">
                            <SearchBar sendSearchResults={this.showSearchResults} showAll={this.showAll}/>
                        </div>
                        {this.state.waitingForSearchRes ? this.state.resultsFromSearch.length > 0
                            ?
                            <div>{makePosts_test(this.state.resultsFromSearch)}</div>
                            :
                            <div>No results found...</div>
                            :
                            <MainSection posts={this.state.posts}/>}
                    </div>
                    <Sidebar LatestPostr={latestThree} pouplatThree={popularThree}/>
                </section>
            );
        }else{
            return (<div>Loading...</div>);
        }
}

}

