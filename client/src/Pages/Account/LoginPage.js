//import "../../styles/Account/LoginPage.css";
import "../../styles/Account/SignUpPage.css";

import React from 'react';
import LoginPart from  "../../Components/Account/LoginPart"
import SignupPart from "../../Components/Account/SignupPart";
import SubCont from "../../Components/Account/SubCont";

class LoginPage extends React.Component{
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        document.querySelector('.img-btn').addEventListener('click', function()
            {
                document.querySelector('.cont').classList.toggle('s-signup')
            }
        );
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
export default LoginPage;