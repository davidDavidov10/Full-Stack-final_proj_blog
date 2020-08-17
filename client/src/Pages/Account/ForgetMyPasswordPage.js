import React from "react";
import {sendRestPassEmail} from "../../utils/server/User"

class ForgetMyPasswordPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            email:"",
            ErrMsg:false
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

        })
            .catch((err)=>{
                this.setState({ErrMsg:err.response.data.msg})
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
            </div>
        );
    }
}
export default ForgetMyPasswordPage;