import React, {Component} from 'react';
import {Link, Route} from "react-router-dom";
import '../styles/Home/Sidarbar.css'

class Sidebar extends Component{
    constructor(props) {
        super(props);

    }
    render() {
        if(this.props.LatestPostr[0]) {
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
                    <label className="title">Popular</label>
                    <ul className="side-bar-list">
                        <li className="SideListPosts">
                            <div className="sidePostTitle">Blog post #1</div>
                            <Link to="/post/42">Here</Link>
                        </li>
                        <li className="SideListPosts">
                            <div className="sidePostTitle">Blog post #2</div>
                            <Link to="/post/43">Here</Link>
                        </li>
                        <li className="SideListPosts">
                            <div className="sidePostTitle">Blog post #3</div>
                            <Link to="/post/41">Here</Link>
                        </li>
                    </ul>
                </aside>

            );
        }else {
            return (<div>loading...</div>)
        }
    }


}
export default Sidebar;