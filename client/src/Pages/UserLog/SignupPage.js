import React from 'react';

import SignupBox from "../../Components/SignupBox";
import "../../styles/user/SignupPage.css"

import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login"
import {doSignUp} from "../../utils/server/User";

class SignupPage extends React.Component{
    constructor(props) {
        super(props);
    }
    componentClicked=()=>{

    }


    responseFacebook=(response)=>{
        console.log("responseFacebook")
        console.log(response);
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
        console.log(response);
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
    render(){
        return(
            <div>
                <SignupBox {...this.props} />
                <FacebookLogin
                    appId="195415831906766"
                    textButton = "Sign Up with Facebook"
                    fields="name,email,picture"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}/>


                <GoogleLogin
                    clientId="898618270538-o801b7d6oqp0o1aib2oa9m3pbch8m98u.apps.googleusercontent.com"
                    buttonText="SIGN UP WITH GOOGLE"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}/>
            </div>
        )
    }
}
export default SignupPage;

