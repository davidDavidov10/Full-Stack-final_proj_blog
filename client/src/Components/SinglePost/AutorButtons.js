import React from 'react';
import {Link} from "react-router-dom";
import {changePostPhase, deletePost} from "../../utils/server/Posts";
import {like_Post,unlike_Post} from "../../utils/server/Likes";

import AlertDialog from "../AlertDialogs/Delete";

class AutorButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            published: this.props.post.published === 1 ? true : false,
        }
    }
    handleLike=()=>{
        if (!this.props.likes.includes(this.props.user.id)) {
            like_Post(this.props.post.id)
                .then((res)=>{
                    this.props.setLikesIds(this.props.user.id, true)
                })
                .catch((err) => {
                });
        }
        else {
            unlike_Post(this.props.post.id)
                .then((res)=>{
                    this.props.setLikesIds(this.props.user.id, false)
                })
                .catch((err) => {

                });
        }
    }

    handleDelete=()=>{
        deletePost(this.props.post)
            .then((res)=>{
                this.props.history.push('/my posts');
            })
            .catch(()=>{
            });
    }

    postPhases=()=>{
        this.setState({published:!this.state.published})
        changePostPhase(this.props.post)
            .then((res)=>{
            })
            .catch(()=>{
                this.setState({published:!this.state.published})
            });
    }

    render() {
        return (
            <div className="postDesc">

                <span className="desc">
                    {this.props.likes.includes(this.props.user.id)
                    ?
                        <button className="fa fa-heart"
                                aria-hidden="true"
                                title="Like"
                                style={{color: "red",fontSize:"25px"}}
                                onClick={this.handleLike}/>
                        :
                        <button className="fa fa-heart-o"
                                aria-hidden="true"
                                title="Like"
                                style={{color: "#00000030",fontSize:"25px"}}
                                onClick={this.handleLike}/>
                    }
                </span>

                {this.props.post.author_id == this.props.user.id
                    ?
                    <div className="authorB">
                        <span className="desc">
                            <Link to={`/post/${this.props.post.id}/edit`}>
                                <button className="fa fa-pencil-square-o"
                                        style={{fontSize:"25px"}}
                                        aria-hidden="true"
                                        title="Edit Post"/>

                            </Link>
                        </span>
                        <AlertDialog handleDelete={this.handleDelete}/>
                        <span className="desc">
                            {this.state.published
                                ?
                                <div>
                                    <input type="checkbox" className="toggle" checked onClick={this.postPhases}/>
                                    <p style={{color:"lime"}}>Published</p>
                                </div>
                                :
                                <div>
                                    <input type="checkbox" className="toggle" onClick={this.postPhases}/>
                                    <p style={{color:"black" }}>Draft</p>
                                </div>
                            }
                        </span>
                    </div>
                    :
                    null
                }
            </div>
            );
    }
}

export default AutorButtons;





