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
                        <li>
                            <span>{this.props.LatestPostr[0].title}: </span>
                            <Link to={`/post/${this.props.LatestPostr[0].id}`}>Here</Link>
                        </li>
                        <li>
                            <span>{this.props.LatestPostr[1].title}: </span>
                            <Link to={`/post/${this.props.LatestPostr[1].id}`}>Here</Link>
                        </li>
                        <li>
                            <span>{this.props.LatestPostr[2].title}: </span>
                            <Link to={`/post/${this.props.LatestPostr[2].id}`}>Here</Link>
                        </li>
                    </ul>
                    <hr/>
                    <label className="title">Popular</label>
                    <ul className="side-bar-list">
                        <li>
                            <span>Blog post #1</span>
                            <Link to="/post/42">Here</Link>
                        </li>
                        <li>
                            <span>Blog post #2</span>
                            <Link to="/post/43">Here</Link>
                        </li>
                        <li>
                            <span>Blog post #3</span>
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