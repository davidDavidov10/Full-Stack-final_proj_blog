import React from 'react';
import {makePosts} from "../utils/utils";
import '../styles/Home/MainSection.css'

// functional component currently present only post

export default function MainSection(props){
    if (props.posts.length !== 0){
        return (
            <div>
                {makePosts(props.posts)}
            </div>
        );
    }
    else{
        return (
            <div>No posts for now..</div>
        );
    }

}




