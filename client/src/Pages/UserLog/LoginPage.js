import React from 'react';

import LoginBox from "../../Components/LoginBox";
import "../../styles/user/LoginPage.css"

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login"
import {doSignUp} from "../../utils/server/User";
import {doLogin} from "../../utils/server/User";
import SignupBox from "../../Components/SignupBox";


class LoginPage extends React.Component{
    constructor(props) {
        super(props);
    }
    componentClicked=()=>{

    }
    responseFacebook=(response)=>{
        console.log(response);
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
    render(){
        return(
            <div>
                <LoginBox  {...this.props} handleLog ={this.props.handleLog}/>
                <FacebookLogin
                    appId="195415831906766"
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}

                />

                <GoogleLogin
                    clientId="898618270538-o801b7d6oqp0o1aib2oa9m3pbch8m98u.apps.googleusercontent.com"
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}/>

            </div>
        )
    }
}
export default LoginPage;
//{fbContent}