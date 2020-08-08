import React from 'react';
import  Posts from '../App/Posts'

function MainSection(){
    return (
        <section className="post-section">
            <label className="title">This is my blog</label>
            <div className="posts-list">
                <Posts user ={null}/>
            </div>
        </section>
    );
}

export default MainSection;

