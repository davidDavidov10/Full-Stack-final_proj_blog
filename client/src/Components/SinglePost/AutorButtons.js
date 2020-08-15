import React from 'react';
import {Link} from "react-router-dom";
import {changePostPhase, deletePost} from "../../utils/server/Posts";


class AutorButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            published: this.props.post.published === 1 ? true : false
        }
    }
    handleLike=()=>{
        this.setState({liked:!this.state.liked})
    }

    handleDelete=()=>{
        deletePost(this.props.post)
            .then((res)=>{
                this.props.history.push('/my posts');
                this.setState({resp:"Post Deleted!"})
            })
            .catch(()=>{
                this.setState({resp:"Something went wrong, try again please."})
            });
    }

    postPhases=()=>{
        changePostPhase(this.props.post)
            .then((res)=>{
                this.setState({published:!this.state.published})
            })
            .catch(()=>{
                console.log("somethig wrong with publish/un-publish")
            });
    }

    render() {
        return (
            <div className="postDesc">
                <span className="desc">
                    {this.state.liked
                        ?
                        <button className="fa fa-heart" aria-hidden="true" title="Like" style={{color: "red",fontSize:"25px"}} onClick={this.handleLike}></button>
                        :
                        <button className="fa fa-heart-o" aria-hidden="true" title="Like" style={{color: "#00000030",fontSize:"25px"}} onClick={this.handleLike}></button>}
                </span>
                {this.props.post.author_id == this.props.user.id
                    ?
                    <div className="authorB">
                        <span className="desc">
                            <Link to={`/post/${this.props.post.id}/edit`}>
                                <button className="fa fa-pencil-square-o"
                                        style={{fontSize:"25px"}}
                                        aria-hidden="true"
                                        title="Edit Post"></button>
                                <br/>
                            </Link>
                        </span>
                        <span className="desc">
                            <button  className="fa fa-trash-o" style={{fontSize:"25px"}} onClick={this.handleDelete} title="Delete Post"></button><br/>
                        </span>
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
                                    <p style={{color:"black" }}>Unpublished</p>
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





