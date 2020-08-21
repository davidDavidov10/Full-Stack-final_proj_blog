import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import '../styles/Home/Sidarbar.css'

class Sidebar extends Component{
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <aside className="side-bar-section">
                <label className="title">Latest</label>
                <ul className="side-bar-list">
                    {this.props.LatestPosts.map((LatestPost)=>{
                        return(
                            <li className="SideListPosts">
                                <div className="sidePostTitle"><Link to={`/post/${LatestPost.id}`}>{LatestPost.title}
                                </Link></div></li>);
                    })}
                </ul>
                <hr/>
                <label className="title">Popular</label>
                <ul className="side-bar-list">
                    {this.props.pouplatThree.map((popularPost)=>{
                        return(
                            <li className="SideListPosts">
                                <div className="sidePostTitle"><Link to={`/post/${popularPost.post_id}`}>{popularPost.post_title}
                                </Link></div></li>);
                    })}
                </ul>
            </aside>

        );
    }


}
export default Sidebar;