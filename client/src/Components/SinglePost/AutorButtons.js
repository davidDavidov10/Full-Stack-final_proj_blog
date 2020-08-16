import React from 'react';
import {Link} from "react-router-dom";
import {changePostPhase, deletePost,like_unlike_Post} from "../../utils/server/Posts";


class AutorButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            published: this.props.post.published === 1 ? true : false,
            liked:false,
        }
    }
    handleLike=()=>{
        let likedOrNot = !this.state.liked
        this.setState({liked:!this.state.liked})
        like_unlike_Post({postId:this.props.post.id, userId:this.props.user.id ,like_unlike: likedOrNot ? 1: 0 })
            .catch((err)=> {
                console.log('something went wrong')
                console.log(err)
            });
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
        // for some reason, if the row below is in the "then" section if we start with switch "on" it wont turned off till refresh
        this.setState({published:!this.state.published})
        changePostPhase(this.props.post)
            // .then((res)=>{
            // })
            .catch(()=>{
                this.setState({published:!this.state.published})
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
                                    {console.log("checked")}
                                    <input type="checkbox" className="toggle" checked onClick={this.postPhases}/>
                                    <p style={{color:"lime"}}>Published</p>
                                </div>
                                :
                                <div>
                                    {console.log("unchecked")}
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





