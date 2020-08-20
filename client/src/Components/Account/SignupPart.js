import React from 'react';
import {doSignUp} from "../../utils/server/User";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import ImgUpload from "../../fb/fileUploadTest"
import {storage} from "../../fb/firebaseStorage";
// import Button from 'react-bootstrap/Button';

class SignupPart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name:null,
            email_address:null,
            password:null,
            c_password:null,
            resp:null,
            img:null,
            error:false,
            errorMsg:null

        }
    }
    handleImgChange = e => {
        if (e.target.files[0]) {
            if (e.target.files[0].size < 2000000 ){
                this.setState({img:e.target.files[0]})
            }else {
                document.getElementById('profilePic').value = '';
                alert("Please upload an image of at most 2MB")
            }
        }
    };
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
    handleSingUp= async (event)=>{
        event.preventDefault();
        if(this.state.password == this.state.c_password) {
            let pictureUrl= this.state.img !==null ? await this.handleUploadImgToFirebase():null;
            doSignUp({...this.state, dataBaseImgUrl:pictureUrl})
                .then((res)=>{
                    this.props.slideMenu()
                })
                .catch(()=>{
                    this.setState({error:true,errorMsg:"Something went wrong.. please try again"})
                });
        }
        else {
            this.setState({error:true,errorMsg:"Passwords dont match!"})
        }
    }
    handleUploadImgToFirebase =()=> {
        const uploadTask = storage.ref(`profileImages/${this.state.img.name}`).put(this.state.img);
        return new Promise((resolve, reject) => {
            uploadTask.on(
                "state_changed",
                snapshot => {
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage
                        .ref(`profileImages/${this.state.img.name}`)
                        .getDownloadURL()
                        .then(url => {
                            console.log(url)
                            resolve(url)
                        });
                }
            );
        });

    };


    componentClicked=()=>{

    }
    responseFacebook= (response)=>{
        if(response){
            let data = {
                user_name:response.name,
                email_address:response.email,
                password:null,
            }
            doSignUp(data)
                .then((res)=>{
                })
                .catch(()=>{
                    this.setState({error:true,errorMsg:"Something went wrong.. please try again"})
                });
        }
    }
    responseGoogle= async (response)=>{
        if(response){
            let data = {
                user_name:response.profileObj.name,
                email_address:response.profileObj.email,
                password:null
            }
            doSignUp(data)
                .then((res)=>{
                })
                .catch(()=>{
                    this.setState({error:true,errorMsg:"Something went wrong.. please try again"})
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

                        <div className="file">
                        <div className={this.state.img ?
                            "file is-primary"
                            :
                            "fileB"}>
                            <label className="fileLabel">
                                <input className="file-input" type="file" id="profilePic" onChange={this.handleImgChange} accept="image/*"/>
                                  <span className="file-cta">
                                    <span className="file-icon">
                                    <i className="fa fa-upload"></i>
                                   </span>
                                    <span>{this.state.img ? 'Profile picture chosen': 'Choose profile picture'}</span>
                                  </span>
                            </label>
                    </div>
                        </div>

                    <button type="submit" className="submit">Sign Up Now</button>
                </form>
                {this.state.error ? <span>{this.state.errorMsg}</span> : null}
                <h6>OR</h6>
                <div className="social-media">
                    <ul>
                        <li>
                            <FacebookLogin
                                appId="195415831906766"
                                textButton = "Sign Up with Facebook"
                                fields="name,email,picture"
                                onClick={this.componentClicked}
                                callback={this.responseFacebook}
                                id="test"
                            />
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