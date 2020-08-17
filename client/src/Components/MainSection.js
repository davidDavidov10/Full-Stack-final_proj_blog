import React from 'react';
import {makePosts} from "../utils/utils";
import '../styles/Home/MainSection.css'

// functional component currently present only posts.
export default function MainSection(props){
        return (<div>{makePosts(props.posts)}</div>);
}




