import React from 'react';

import {doSignUp} from "../utils/server/User"

class SignupBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user_name:null,
            email_address:null,
            password:null,
            c_password:null,
            resp:null
        }
    }
    handleEmail=(e)=>{
        this.setState({
            email_address: e.target.value
        });
    }
    handleUsername=(e)=>{
        this.setState({
            user_name: e.target.value
        });
    }
    handlePassword=(e)=>{
        this.setState({
            password: e.target.value
        });
    }
    handle_c_Password=(e)=>{
        this.setState({
            c_password: e.target.value
        });
    }
    handleSignUp=(event)=>{
        event.preventDefault();
        if(this.state.password == this.state.c_password){
            doSignUp(this.state)
                .then((res)=>{
                    this.props.history.push('/login')
                    // this.setState({resp:"Success ! you are Signed up, go to log in page to log in."})
                })
                .catch(()=>{
                    this.setState({resp:"Something went wrong, try again please."})
                });
        }else{
            this.setState({resp:"Passwords Don't Match"})
        }
    }
    render(){
        return (
            <form className="signUpBox" onSubmit={this.handleSignUp}>
                <img className="avatar" src={"https://udir-blog-avatar.s3.amazonaws.com/avatar.png"}/>
                    <h1>Sign up Here</h1>
                    <label>User Name</label>
                    <input  type="text" placeholder="Enter User Name" onChange={this.handleUsername}></input>
                    <label>Email Address</label>
                    <input
                        type="email"
                        placeholder="default@example.com"
                        onChange={this.handleEmail}>
                    </input>
                    <label>Password</label>
                    <input type="password" placeholder="Password"  required onChange={this.handlePassword}></input>
                    <input type="password" placeholder="Confirm Password" required onChange={this.handle_c_Password}></input>
                <button type="submit" value="Sign Up" className="SignUpButton" >submit</button>
                {this.state.resp ? <span className ="serverResponse">{this.state.resp}</span> : null}
            </form>
        );
    }
}
export default SignupBox;
