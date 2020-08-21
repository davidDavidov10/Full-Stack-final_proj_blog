import React from "react";
import {sendRestPassEmail} from "../../utils/server/User"

import { Alert } from '@material-ui/lab';

class ForgetMyPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            email:"",
            ErrMsg:false,
            emailSent:null
        }

    }
    handelEmail=(e)=>{
        this.setState({
            email:e.target.value
        })
    }

    handleClick=()=>{
        sendRestPassEmail(this.state)
            .then((res)=>{
                this.setState({emailSent: true})
        })
            .catch((err)=>{
                this.setState({emailSent:false})
            });
    }
    render(){
        return(
            this.state.ErrMsg ?
                this.state.ErrMsg:
            <div className="restPassword">
                <h1>Forget password</h1>
                <p>Enter you email</p>
                <input type="text"
                       placeholder="example@example.com"
                       onChange={this.handelEmail}
                />
                <br/>
                <input type="submit"
                       value="Reset My Password"
                       className="forgetButton"
                       onClick={this.handleClick}
                />
                {this.state.emailSent === true ? <Alert severity="success">An email will send in a few minutes, make sure you check your spam.</Alert> : null}
                {this.state.emailSent === false ? <Alert severity="error">Email doesn't exsit</Alert> : null}
            </div>
        );
    }
}
export default ForgetMyPasswordPage;