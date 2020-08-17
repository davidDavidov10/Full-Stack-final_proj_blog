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
                        <li className="SideListPosts">
                            <div className="sidePostTitle"><Link to={`/post/${this.props.LatestPostr[0].id}`}>{this.props.LatestPostr[0].title}</Link></div>
                        </li>
                        <li className="SideListPosts">
                            <div className="sidePostTitle"><Link to={`/post/${this.props.LatestPostr[1].id}`}>{this.props.LatestPostr[1].title}</Link></div>
                        </li>
                        <li className="SideListPosts">
                            <div className="sidePostTitle"><Link to={`/post/${this.props.LatestPostr[2].id}`}>{this.props.LatestPostr[2].title}</Link></div>
                        </li>
                    </ul>
                    <hr/>
                    {console.log(this.props.pouplatThree[0])}
                    <label className="title">Popular</label>
                    <ul className="side-bar-list">
                        <li className="SideListPosts">
                            <div className="sidePostTitle"><Link to={`/post/${this.props.pouplatThree[0].post_id}`}>{this.props.pouplatThree[0].post_title}
                                {console.log(this.props.pouplatThree[0].post_title)}
                            </Link></div>
                        </li>
                        <li className="SideListPosts">
                            <div className="sidePostTitle"><Link to={`/post/${this.props.pouplatThree[1].post_id}`}>{this.props.pouplatThree[1].post_title}</Link></div>
                        </li>
                        <li className="SideListPosts">
                            <div className="sidePostTitle"><Link to={`/post/${this.props.pouplatThree[2].post_id}`}>{this.props.pouplatThree[2].post_title}</Link></div>
                        </li>
                    </ul>
                </aside>

            );
    }


}
export default Sidebar;