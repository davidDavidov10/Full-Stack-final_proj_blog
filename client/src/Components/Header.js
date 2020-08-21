import React from 'react';
import {Link} from "react-router-dom";
import {doLogout} from "../utils/server/User";
import "../styles/App/Header.css"

class Header extends React.Component{
    constructor(props) {
        super(props);
    }
    handleLogout=()=>{
        doLogout()
            .then((res)=>{
                const  user ={
                    id:null,
                    name:null,
                    isLoggedIn:false
                }
                this.props.setUser(user)
            })
            .catch(()=>{
            });
    }
    render() {
        return (
            <header>
                <nav className="navBar">
                    <ul className="AllLinks">
                        <ul className="leftNavSide">
                            <li className="Logo">
                                <Link  to = "/home" className="navbar-brand text-white">
                                    <i className="fa fa-graduation-cap fa-lg mr-2"></i>
                                    BLOG
                                </Link>
                            </li>
                            <li className="listElement">
                                <Link to="/home" className="link">
                                    <i className="fa fa-home fa-fw mr-1"></i>
                                    Home
                                </Link>
                            </li>
                            <li className="listElement">
                                <Link to="/about" className="link" >
                                    <i className="fa fa-info-circle fa-fw mr-1"></i>
                                    About
                                </Link>
                            </li>
                            {this.props.user.isLoggedIn
                                ?
                                <ul className="leftNavSide">
                                    <li className="listElement">
                                        <Link to="/new post"className="link">
                                            <i className="fa fa-plus-square-o" aria-hidden="true"></i>
                                            New post
                                        </Link>
                                    </li>
                                    <li className="listElement">
                                        <Link to="/my posts" className="link">
                                            <i className="fa fa-th-list fa-fw mr-1"></i>
                                            My posts
                                        </Link>
                                    </li>
                                </ul>
                                :
                                null
                            }
                        </ul>
                        <ul className="rightNavSide">
                            {this.props.user.isLoggedIn
                                ?
                                <ul className="rightNavSide">
                                    <li className="listElement" id="WelcomeUser">Welcome,{this.props.user.name}</li>
                                    <li className="listElement">
                                        <Link to="/" className="link"
                                              onClick={this.handleLogout}>
                                            <i className="fa fa-sign-out" aria-hidden="true"></i>
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                                :
                                <ul className="rightNavSide">
                                    <li className="listElement">
                                        <Link to="/Log in" className="link">
                                            <i className="fa fa-user-circle" aria-hidden="true"></i>
                                            Log in
                                        </Link>
                                    </li>
                                    <li className="listElement">
                                        <Link to="/Sign up" className="link">
                                            <i className="fa fa-user-plus" aria-hidden="true"></i>
                                            Sign up
                                        </Link>
                                    </li>
                                </ul>
                            }
                        </ul>
                    </ul>
                </nav>
                <div className="header-pic-container">
                    <img className="header-pic"
                         src="https://firebasestorage.googleapis.com/v0/b/blog-91cd0.appspot.com/o/BlogImages%2Fblog_header_pic.jpg?alt=media&token=ba63a39f-2e71-4855-9483-0cf9a6043ce3"
                         alt="Snow"/>
                </div>
            </header>

        );
    }
}
export default Header;


