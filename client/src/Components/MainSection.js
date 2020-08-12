import React from 'react';
import {makePosts} from "../utils/utils";


// functional component currently present only posts.
export default function MainSection(props){
        return (<div className="posts-list">
                {makePosts(props.posts)}
            </div>);
}




