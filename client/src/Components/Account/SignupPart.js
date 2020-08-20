import React from 'react';
import {doSignUp} from "../../utils/server/User";
import FacebookLogin from "react-facebook-login";
import GoogleLogin from "react-google-login";
import ImgUpload from "../../fb/fileUploadTest"
import {storage} from "../../fb/firebaseStorage";
import {TextField, Input,Button} from "@material-ui/core";

class SignupPart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name:null,
            email_address:null,
            password:null,
            c_password:null,
            error:false,
            errorMsg:null,
            profileImg:"https://udir-blog-avatar.s3.amazonaws.com/avatar.png",
            profileImgName:"aa"
        }
    }
    handleIFileSelected = (e) => {
        const reader = new FileReader()
        reader.onload = () =>{
            if (reader.readyState === 2) {
                this.setState({profileImg:reader.result})
            }
        }
        reader.readAsDataURL(e.target.files[0])
        this.setState({profileImgName:e.target.files[0].name})
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
    handleSingUp=(event)=>{
        event.preventDefault();
        if(this.state.password === this.state.c_password) {
            console.log("1")
            this.handleFileUpload()
            console.log("2")
                .then((url) => {
                    doSignUp({...this.state, dataBaseImgUrl:url})
                        .then((res)=>{
                            this.props.slideMenu()
                        })
                        .catch(()=>{
                            this.setState({error:true,errorMsg:"Something is wrong, try again!"})
                        });
            })
        }else {
            this.setState({error:true,errorMsg:"Passwords doesn\'t match!"})
        }
    }
    handleFileUpload =()=> {
        const uploadTask = storage.ref(`profileImages/${this.state.profileImgName}`).put(this.state.profileImg);
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
                        .ref(`profileImages/${this.state.profileImg.name}`)
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
    responseFacebook=(response)=>{
        if(response){
            let data = {
                user_name:response.name,
                email_address:response.email,
                password:null
            }
            doSignUp(data)
                .then((res)=>{

                })
                .catch(()=>{
                    this.setState({error:true,errorMsg:"Something is wrong, try again!"})
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

                })
                .catch(()=>{
                    this.setState({error:true,errorMsg:"Something is wrong, try again!"})
                });
        }
    }
    render() {
        return(
            <div className="form sign-up">
                <img  className="avatar" src={this.state.profileImg}/>
                <form onSubmit={this.handleSingUp}>
                    <h2>Sign Up</h2>
                    <label>
                        <span>User Name</span>
                        <TextField type="text" required onChange={this.handleUsername}/>
                    </label>
                    <label>
                        <span>Email Address</span>
                        <TextField type="email" required onChange={this.handleEmail}/>
                    </label>
                    <label>
                        <span>Password</span>
                        <TextField type="password" required onChange={this.handlePassword}/>
                    </label>
                    <label>
                        <span>Confirm Password</span>
                        <TextField type="password" required onChange={this.handle_c_Password}/>
                    </label>
                    <input type="file"
                           className="input-img"
                           style={{display:'none'}}
                           onChange={this.handleIFileSelected}
                           ref={fileInput =>this.fileInput = fileInput}
                           accept="image/*"
                    />
                    <button type="button"
                            className="input-img"
                            onClick={()=>this.fileInput.click()}>Upload profile picture
                    </button>
                    <Button type="submit" className="submit">Sign Up Now</Button>
                </form>
                <h6>{this.state.error ? <h6>{this.state.errorMsg}</h6>: null}</h6>
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
