import React from 'react';
import {doSignUp} from "../../utils/server/User";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";

class SignupPart extends React.Component {
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
    handleSingUp=(event)=>{
        event.preventDefault();
        console.log(this.state)
        if(this.state.password == this.state.c_password){
            console.log(this.state)
            doSignUp(this.state)
                .then((res)=>{
                    // this.setState({resp:"Success ! you are Signed up, go to log in page to log in."})
                })
                .catch(()=>{
                    this.setState({resp:"Something went wrong, try again please."})
                });
        }else{
            this.setState({resp:"Passwords Don't Match"})
        }
    }
    componentClicked=()=>{

    }
    responseFacebook=(response)=>{
        if(response){
            let data = {
                user_name:response.name,
                email_address:response.email,
                password:null
            }
            doSignUp(data)
                .then((res)=>{
                    this.setState({resp:"Success ! you are Signed up, go to log in page to log in."})
                })
                .catch(()=>{
                    this.setState({resp:"Something went wrong, try again please."})
                });
        }
    }
    responseGoogle=(response)=>{
        if(response){
            let data = {
                user_name:response.profileObj.name,
                email_address:response.profileObj.email,
                password:null
            }
            doSignUp(data)
                .then((res)=>{
                    this.setState({resp:"Success ! you are Signed up, go to log in page to log in."})
                })
                .catch(()=>{
                    this.setState({resp:"Something went wrong, try again please."})
                });
        }
    }
    render() {
        return(
            <div className="form sign-up">
                <form onSubmit={this.handleSingUp}>
                    <h2>Sign Up</h2>
                    <label>
                        <span>Name</span>
                        <input type="text" onChange={this.handleUsername}></input>
                    </label>
                    <label>
                        <span>Email</span>
                        <input type="email" onChange={this.handleEmail}></input>
                    </label>
                    <label>
                        <span>Password</span>
                        <input type="password" required onChange={this.handlePassword}></input>
                    </label>
                    <label>
                        <span>Confirm Password</span>
                        <input type="password" required onChange={this.handle_c_Password}></input>
                    </label>
                    <button type="submit" className="submit">Sign Up Now</button>
                </form>
                <h6>OR</h6>
                <div className="social-media">
                    <ul>
                        <li>
                            <FacebookLogin
                                appId="195415831906766"
                                textButton = "Sign Up with Facebook"
                                fields="name,email,picture"
                                onClick={this.componentClicked}
                                callback={this.responseFacebook}/>
                        </li>
                        <li>
                            <GoogleLogin
                                clientId="898618270538-o801b7d6oqp0o1aib2oa9m3pbch8m98u.apps.googleusercontent.com"
                                buttonText="SIGN UP WITH GOOGLE"
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
export default SignupPart;
