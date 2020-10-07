import React from 'react';
import {searchPosts} from "../utils/server/Posts";
import "../styles/Home/searchBarstyle.css"

class searchBar extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search:'',
        }
    }
    onChangeSearchBar = (event)=>{
        this.setState({search:event.target.value})
        if (event.target.value.length === 0) {
            this.props.showAll();
        }
    }
    handlePostSearch =()=>{
        if (this.state.search !== '') {
            searchPosts(this.state.search.toLowerCase())
                .then((response) => {
                    this.props.sendSearchResults(response.data);
                })
        }
    }
    render(){
            return(
                    <div className="topnav">
                            <input type="search"
                                   onChange={this.onChangeSearchBar}
                                   className="searchBarInput"
                                   placeholder="Search..."/>
                            <button onClick={this.handlePostSearch}
                                    className="fa fa-search"
                                    id="SearchButton"/>
                    </div>
            );
        }
}

export default searchBar;