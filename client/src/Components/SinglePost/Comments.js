import React from 'react';
import {makeComments} from "../../utils/utils";
import {getAllComments} from "../../utils/server/Comments";


class Comments extends React.Component {
    constructor(props) {
        super(props);
        console.log("this.props.comments = ")
        console.log(this.props.comments)
    }
    render() {
        if (this.props.comments){
            return (
                <section className="comments-section">
                    <br/>
                    <h5>Comments</h5>
                    <div className="comments">
                        {this.props.comments !== 0 ? makeComments(this.props.comments):<div>Be the first one to comment!</div>}
                    </div>
                </section>
            );
        }
        else{
            return (
                <section className="comments-section">
                    <br/>
                    <h5>Loading comments...</h5>
                </section>
            );
        }

    }
}

export default Comments;





