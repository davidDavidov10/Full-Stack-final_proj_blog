import React from 'react';
import {doSignUp} from "../utils/server/User";

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
                    console.log("1")
                    // this.setState({resp:"Success ! you are Signed up, go to log in page to log in."})
                })
                .catch(()=>{
                    console.log("2")
                    this.setState({resp:"Something went wrong, try again please."})
                });
        }else{
            this.setState({resp:"Passwords Don't Match"})
        }
    }
    render() {
        return(
            <form className="form sign-up" onSubmit={this.handleSignUp}>
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
        );
    }
}
export default SignupPart;
