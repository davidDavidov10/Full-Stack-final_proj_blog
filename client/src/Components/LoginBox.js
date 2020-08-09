import React from 'react';
import {Link} from "react-router-dom/";
import {doLogin} from "../utils/server/User"


class LoginBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            userName:null,
            password:null,
            resp:null,
            social_login:false
        }
    }
    handleUsername=(e)=>{
        this.setState({
            userName: e.target.value
        });
    }
    handlePassword=(e)=>{
        this.setState({
            password: e.target.value
        });
    }
    handleResp =(serverResp)=>{
        this.setState({
            resp:serverResp
        })
    }
    handleLogin=()=>{
        console.log("test123")
        doLogin(this.state)
            .then((res)=>{
                console.log(res)
                const  user ={
                    id:res.data["id"],
                    name:res.data["name"],
                    isLoggedIn:true
                }
                this.props.handleLog(user)
                this.props.history.push('/')
                // this.setState({resp:"Success ! you are Logged in"})
            })
            .catch((err)=>{
                console.log("err = ")
                console.log(err)
                this.setState({resp:"Something went wrong, try again please123."})
            });
    }
    render(){
        return (
            <div className="loginbox">
                <img className="avatar" src={"https://udir-blog-avatar.s3.amazonaws.com/avatar.png"}/>
                <h1>Login Here</h1>
                <label>UserName</label>
                <textarea type="text" placeholder="Enter Username" onChange={this.handleUsername}></textarea>
                <label>Password</label>
                <textarea type="password"  placeholder="Enter Password" onChange={this.handlePassword}></textarea>
              <button className="loginButton" onClick={this.handleLogin}>Login</button>
                <br/>
                {this.state.resp ? <p className ="serverResponse">{this.state.resp}</p> : null}
                <span>Forget you password?<Link to="/password_reset">Click here.</Link></span>
                <br/>
                <span>Don't have an account?<Link to="/SignUp">Create an account.</Link></span>
            </div>
        );
    }
}
export default LoginBox;