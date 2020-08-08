import React from 'react';
import LoginPage from "../Pages/UserLog/LoginPage";
import {Link, Route} from "react-router-dom";

function Sidebar(){
    return (
        <aside className="side-bar-section">
            <label className="title">Latest</label>
            <ul className="side-bar-list">
                <li>
                    <span>Blog post #1</span>
                    <Link to="/post/41">Here</Link>
                </li>
                <li>
                    <span>Blog post #2</span>
                    <Link to="/post/42">Here</Link>
                </li>
                <li>
                    <span>Blog post #3</span>
                    <Link to="/post/43">Here</Link>
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
}
export default Sidebar;