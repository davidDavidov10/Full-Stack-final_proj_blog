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
    handleKey = (event)=>{
        const keyCode = event.keyCode;
        if (keyCode === 13) {
            this.handlePostSearch()
        }
    }

    render(){
            return(
                    <div className="topnav">
                            <input onChange={this.onChangeSearchBar}
                                   className="searchBarInput"
                                   placeholder="Search..."
                                   onKeyUp={this.handleKey}/>
                            <button type="submit"
                                    onClick={this.handlePostSearch}
                                    className="fa fa-search"
                                    id="SearchButton"
                                    ref={node => (this.btn = node)}/>
                    </div>
            );
        }
}

export default searchBar;