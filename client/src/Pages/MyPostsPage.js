import React from "react";

import  Posts from '../App/Posts'
import {checkLogin} from "../utils/server/User";


class MyPostsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className ="title">
                    welcome {this.props.user.name} <br/>
                    click on title to edit the post!
                </div>

                <div className="posts-list">
                    <Posts user ={this.props.user}/>
                </div>
            </div>
        );
    }
}
export default MyPostsPage;