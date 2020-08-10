import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import {checkLogin} from "../utils/server/User"
import Header from "../Components/Header";

import LoginPage from "../Pages/UserLog/LoginPage";
import SignupPage from "../Pages/UserLog/SignupPage";
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage"
import NewPostPage from "../Pages/NewPostPage"
import MyPostsPage from "../Pages/MyPostsPage"
import EditPostPage from "../Pages/EditPostPage"
import SinglePostPage from "../Pages/SinglePostPage"
import ForgetMyPasswordPage from "../Pages/UserLog/ForgetMyPasswordPage"
import ResetPasswordPage from "../Pages/UserLog/ResetPasswordPage"
import LoginPage_test from "../test/LoginPage_test";
import Header_test from "../test/Header_test";



import '../styles/App.css';

const user ={
  id:null,
  name:null,
  isLoggedIn:null
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: user
    }
  }
  handleLog=(data)=>{
    this.setState({user: data});
  }
  componentDidMount() {
    checkLogin()
        .then((res)=>{
          const  user ={
            id:res.data["id"],
            name:res.data["name"],
            isLoggedIn:true
          }
          this.handleLog(user)
        })
        .catch(()=>{
          const  user ={
            id:null,
            name:null,
            isLoggedIn:false
          }
          this.handleLog(user)
        });
  }
  render(){
    return(
        <div>
          <Router>
            <Header_test user={this.state.user} handleLogout={this.handleLog}/>
            {/*<Header user={this.state.user} handleLogout={this.handleLog}/>*/}
            <div className="blog-body">
              <Switch>
                <Route path='/login' render={(props) => <LoginPage{...props} handleLog={this.handleLog}/>}/>
                <Route path='/test/login' render={(props) => <LoginPage_test{...props} handleLog={this.handleLog}/>}/>
                <Route path='/signUp' render={(props) => <SignupPage{...props} handleLog={this.handleLog}/>}/>
                <Route path ="/home"><HomePage  handleLog={this.handleLog}/></Route>
                <Route path ="/about"><AboutPage  handleLog={this.handleLog}/></Route>
                <Route path='/my posts' render={(props) => <MyPostsPage{...props} user= {this.state.user}  handleLog={this.handleLog}/>}/>
                <Route path='/new post' render={(props) => <NewPostPage {...props} user= {this.state.user}  handleLog={this.handleLog}/>}/>
                <Route path='/post/:id/edit' render={(props) => <EditPostPage{...props} user= {this.state.user}  handleLog={this.handleLog}/>}/>
                <Route path='/post/:id' render={(props) => <SinglePostPage{...props} user= {this.state.user}  handleLog={this.handleLog}/>}/>
                <Route path='/password_reset/:token' render={(props) => <ResetPasswordPage{...props}/>}/>
                <Route path='/password_reset' render={(props) => <ForgetMyPasswordPage{...props}/>}/>
                <Route path ="/"><HomePage/></Route>
              </Switch>
            </div>
          </Router>
        </div>
    );
  }
}
export default App;
