import React from 'react';
import "./LoginPage_test.css";
import LoginPart from "./LoginPart";
import SignupPart from "./SignupPart";
import SubCont from "./SubCont";
import LoginBox from "../Components/LoginBox";

class LoginPage_test extends React.Component{
    constructor(props) {
        super(props);
    }
    render(){
        return(
            <div className="sign-up-body">
                <div className="cont">
                    <LoginPart {...this.props} handleLog ={this.props.handleLog}/>
                    <div className="sub-cont">
                        <SubCont/>
                        <SignupPart/>
                    </div>
                </div>
            </div>
        )
    }
}
export default LoginPage_test;