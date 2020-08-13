import React from 'react';
import {doLogin} from "../../utils/server/User";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import {Link} from "react-router-dom";

class LoginPart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:null,
            password:null,
            resp:null,
            social_login:false,
            selectedFile:null
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
    handleLogin=()=>{
        doLogin(this.state)
            .then((res)=>{
                const  user ={
                    id:res.data["id"],
                    name:res.data["name"],
                    isLoggedIn:true
                }
                this.props.handleLog(user)
                this.props.history.push('/home')
                // this.setState({resp:"Success ! you are Logged in"})
            })
            .catch((err)=>{
                this.setState({resp:"Something went wrong, try again please123."})
            });
    }

    componentClicked=()=>{

    }
    responseFacebook=(response)=>{
        if(response){
            let data = {
                userName:response.name,
                email:response.email,
                social_login:true
            }
            doLogin(data)
                .then((res)=>{
                    const  user ={
                        id:res.data["id"],
                        name:res.data["name"],
                        isLoggedIn:true
                    }
                    this.props.handleLog(user)
                    this.setState({resp:"Success ! you are Logged in!"})
                })
                .catch(()=>{
                    this.setState({resp:"Something went wrong, try again please."})
                });
        }
    }
    responseGoogle=(response)=>{
        if(response){
            let data = {
                userName:response.profileObj.name,
                email:response.profileObj.email,
                social_login:true
            }
            doLogin(data)
                .then((res)=>{
                    const  user ={
                        id:res.data["id"],
                        name:res.data["name"],
                        isLoggedIn:true
                    }
                    this.props.handleLog(user)
                    this.setState({resp:"Success ! you are Logged in!"})
                })
                .catch(()=>{
                    this.setState({resp:"Something went wrong, try again please."})
                });
        }
    }

    render() {
        return(
            <div className="form log-in">
                <h2>Log In</h2>
                <label>
                    <span>User Name</span>
                    <input type="text" name="email"  onChange={this.handleUsername}></input>
                </label>
                <label>
                    <span>Password</span>
                    <input type="password" name="password" onChange={this.handlePassword}></input>
                </label>
                <button className="submit" type="button" onClick={this.handleLogin}>Login</button>
                <Link to="/password_reset"> <p className="forgot-pass">Forgot Password ?</p></Link>
                <h6>OR</h6>
                <div className="social-media">
                    <ul>
                        <li>
                            <FacebookLogin
                                appId="195415831906766"
                                fields="name,email,picture"
                                onClick={this.componentClicked}
                                callback={this.responseFacebook}
                            />
                        </li>
                        <li>
                            <GoogleLogin
                                clientId="898618270538-o801b7d6oqp0o1aib2oa9m3pbch8m98u.apps.googleusercontent.com"
                                buttonText="LOGIN WITH GOOGLE"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}/>
                        </li>
                    </ul>
                </div>
            </div>
            );
    }
}
export default LoginPart;
