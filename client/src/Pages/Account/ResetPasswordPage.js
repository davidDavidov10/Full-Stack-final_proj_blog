import React from "react";
import {setUserPassword} from "../../utils/server/User"

class ResetPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            password:null,
            confirmPassword:null,
            MsgOfErr: null
        }
    }
    handelPassword=(e)=>{
        this.setState({
            password:e.target.value
        })
    }
    handelConfirmPassword=(e)=>{
        this.setState({
            confirmPassword:e.target.value
        })
    }

    handleClick=()=>{
        if (this.state.password === this.state.confirmPassword){
            let token = this.props.match.params.token;
            setUserPassword(token,this.state)
                .then((res)=>{

                })
                .catch((err)=>{
                    this.setState({MsgOfErr:err.response.data.msg})
                });
        }else{
            alert("Passwords don't much!")
        }
    }
    render(){
        return(
                this.state.MsgOfErr ?
                    this.state.MsgOfErr :
                    <div className="restPassword">
                        <h1>Forget password</h1>
                        <p>Enter your password</p>
                        <input type="text" placeholder="your password here" onChange={this.handelPassword}></input><br/>
                        <p>confirm password</p>
                        <input type="text" placeholder="enter password again"
                               onChange={this.handelConfirmPassword}></input><br/>

                        <input type="submit"
                               value="Reset My Password"
                               className="forgetButton"
                               onClick={this.handleClick}>
                        </input>

                    </div>
        );
    }
}
export default ResetPasswordPage;