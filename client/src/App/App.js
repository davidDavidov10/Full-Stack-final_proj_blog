import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import '../styles/App/App.css';
import Header from "../Components/Header";
import {checkLogin} from "../utils/server/User"
import HomePage from "../Pages/HomePage";
import AboutPage from "../Pages/AboutPage"
import NewPostPage from "../Pages/NewPostPage"
import MyPostsPage from "../Pages/MyPostsPage"
import EditPostPage from "../Pages/EditPostPage"
import SinglePostPage from "../Pages/SinglePostPage"
import Account from "../Pages/Account/RegistrationPage";
import ForgetMyPasswordPage from "../Pages/Account/ForgetMyPasswordPage"
import ResetPasswordPage from "../Pages/Account/ResetPasswordPage"
import FileUpload from "../fb/fileUploadTest"

import EditPage_test from "../test/EditComp_test"

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
  setUser=(data)=>{
    this.setState({user: data});
  }
  componentDidMount() {
    checkLogin()
        .then((res)=>{
          const user ={
            id:res.data["id"],
            name:res.data["name"],
            isLoggedIn:true
          }
          this.setUser(user)
        })
        .catch(()=>{
          const  user ={
            id:null,
            name:null,
            isLoggedIn:false
          }
          this.setUser(user)
        });
  }
  render(){
    return(
        <div>
          <Router>
            <Header user={this.state.user} setUser={this.setUser}/>
            <div className="blog-body">
              <Switch>
                <Route path='/Sign up' render={(props) => <Account{...props} setUser={this.setUser} newUser={true}/>}/>
                <Route path='/Log in' render={(props) => <Account{...props} setUser={this.setUser} newUser={false}/>}/>
                <Route path ="/home"><HomePage  /></Route>
                <Route path='/about' render={(props) => <AboutPage{...props} />}/>
                <Route path='/my posts' render={(props) => <MyPostsPage{...props} user= {this.state.user} />}/>
                <Route path='/new post' render={(props) => <NewPostPage {...props} user= {this.state.user} />}/>
                <Route path='/test/new post' render={(props) => <EditPage_test {...props} user= {this.state.user}/>}/>
                <Route path='/post/:id/edit' render={(props) => <EditPostPage{...props} user= {this.state.user} />}/>
                <Route path='/post/:id' render={(props) => <SinglePostPage {...props} user= {this.state.user}/>}/>
                <Route path='/password_reset/:token' render={(props) => <ResetPasswordPage{...props}/>}/>
                <Route path='/password_reset' render={(props) => <ForgetMyPasswordPage{...props}/>}/>
                <Route path='/test' render={(props) => <FileUpload{...props} />}/>
                <Route path='/' render={(props) => <HomePage{...props} />}/>
              </Switch>
            </div>
          </Router>
        </div>
    );
  }
}
export default App;