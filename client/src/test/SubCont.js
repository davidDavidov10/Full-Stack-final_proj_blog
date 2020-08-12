import React from "react";


class SubCont extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div className="img">

                <div className="img-text m-up">
                    <h2>New here?</h2>
                    <p>Sign up and discover great amount of new opportunities!</p>
                </div>

                <div className="img-text m-in">
                    <h2>One of us?</h2>
                    <p>If you already has an account, just sign in. We've missed you!</p>
                </div>

                <div className="img-btn" >
                    <span className="m-up" >Sign Up</span>
                    <span className="m-in">Sign In</span>
                </div>

            </div>
        );
    }
}
export default SubCont;

