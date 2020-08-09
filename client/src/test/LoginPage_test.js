import React from 'react';
import "./LoginPage_test.css"

class LoginPage_test extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="sign-up-body">
                <div className="cont">
                    <div className="form sign-in">
                        <h2>Sign In</h2>
                        <label>
                            <span>Email Address</span>
                            <input type="email" name="email"></input>
                        </label>
                        <label>
                            <span>Password</span>
                            <input type="password" name="password"></input>
                        </label>
                        <button className="submit" type="button">Sign In</button>
                        <p className="forgot-pass">Forgot Password ?</p>

                        <div className="social-media">
                            <ul>
                                <li><img src="https://www.w3schools.com/images/picture.jpg"/></li>
                                <li><img src="https://www.w3schools.com/images/picture.jpg"/></li>
                            </ul>
                        </div>
                    </div>

                    <div className="sub-cont">
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
                                <span className="m-up" id="m-up-">Sign Up</span>
                                <span className="m-in">Sign In</span>
                            </div>
                        </div>
                        <div className="form sign-up">
                            <h2>Sign Up</h2>
                            <label>
                                <span>Name</span>
                                <input type="text"></input>
                            </label>
                            <label>
                                <span>Email</span>
                                <input type="email"></input>
                            </label>
                            <label>
                                <span>Password</span>
                                <input type="password"></input>
                            </label>
                            <label>
                                <span>Confirm Password</span>
                                <input type="password"></input>
                            </label>
                            <button type="button" className="submit">Sign Up Now</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default LoginPage_test;