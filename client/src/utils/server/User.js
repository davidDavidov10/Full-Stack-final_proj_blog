import axios from "axios";

const doSignUp = (data)=>{
    const url = "/api/signup"
    return  axios.post(url,data)
}
const doLogin= (data)=>{
    const url = "/api/login"
    return   axios.post(url,data)
}

const  checkLogin = () =>{
    const url = "/api/login"
    return  axios.get(url)
}

const doLogout = ()=>{
    const url = "/api/logout"
    return  axios.post(url)
}

const sendRestPassEmail=(emailToSend)=> {
    const url = "/api/password_rest"
    return axios.post(url,emailToSend)
}

const setUserPassword=(token,password)=> {
    const url = `/api/password_rest/${token}`
    return axios.post(url,password)
}

export
{
    checkLogin,
    doLogout,
    doLogin,
    doSignUp,
    sendRestPassEmail,
    setUserPassword
}