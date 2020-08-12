import React from 'react';
import {searchPosts} from "../utils/server/Posts";

class searchBar extends  React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search:'',
        }
    }
    onChangeSearchBar = (event)=>{
        this.setState({
            search:event.target.value,
        })
        if (this.state.search.length -1 === 0 ) {
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
                        <div className="search-container">
                            <input type="text" onChange={this.onChangeSearchBar} placeholder="Search..."/>
                            <button onClick={this.handlePostSearch} className="SearchButton" >Search</button>
                        </div>
                    </div>
            );
        }
}

export default searchBar;