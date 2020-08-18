import "../../styles/Account/RegistrationPage.css";
import React from 'react';
import LoginPart from  "../../Components/Account/LoginPart"
import SignupPart from "../../Components/Account/SignupPart";
import SubCont from "../../Components/Account/SubCont";

class RegistrationPage extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            serverResp:null
        }
    }
    slideMenu=()=>
    {
        document.querySelector('.cont').classList.toggle('s-signup')
    }
    componentDidMount() {
        if (this.props.newUser){
            this.slideMenu()
        }
        document.querySelector('.img-btn').addEventListener('click',this.slideMenu);
    }
    render(){
        return(
            <div className="registration-body">
                <div className="cont">
                    <LoginPart {...this.props}/>
                    <div className="sub-cont">
                        <SubCont/>
                        <SignupPart/>
                    </div>
                </div>
            </div>
        )
    }
}
export default RegistrationPage;