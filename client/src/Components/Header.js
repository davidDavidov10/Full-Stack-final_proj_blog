import React from 'react';
import {Link} from "react-router-dom";
import {doLogout} from "../utils/server/User";
import Header_test from "../styles/App/Header.css";

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
                this.props.handleLogout(user)
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
                            <li className="Logo"><a className="navbar-brand text-white" href="#"><i className="fa fa-graduation-cap fa-lg mr-2"></i>BLOG</a></li>

                            <li className="listElement">
                                <Link to="/home" className="link"><i className="fa fa-home fa-fw mr-1"></i>Home</Link>
                            </li>
                            <li className="listElement">

                                <Link to="/about" className="link" ><i className="fa fa-info-circle fa-fw mr-1"></i>About</Link>
                            </li>
                            {this.props.user.isLoggedIn
                                ?
                                <ul className="leftNavSide">
                                    <li className="listElement">
                                        <Link to="/new post"className="link"><i className="fa fa-plus-square-o" aria-hidden="true"></i> New post</Link>
                                    </li>
                                    <li className="listElement">
                                        <Link to="/my posts" className="link"><i className="fa fa-th-list fa-fw mr-1"></i>My posts</Link>
                                    </li>
                                </ul>:null}
                        </ul>
                        <ul className="rightNavSide">
                            {this.props.user.isLoggedIn
                                ?
                                <ul className="rightNavSide">
                                    <li className="listElement" id="WelcomeUser">Welcome, {this.props.user.name}</li>
                                    <li className="listElement">
                                        <Link to="/" className="link"  onClick={this.handleLogout}><i className="fa fa-sign-out" aria-hidden="true"></i>Logout</Link>
                                    </li>
                                </ul>
                                :
                                <ul className="rightNavSide">
                                    <li className="listElement">
                                        <Link to="/Log in" className="link"><i className="fa fa-user-circle" aria-hidden="true"></i> Log in </Link>
                                    </li>
                                    <li className="listElement">
                                        <Link to="/Sign up" className="link"><i className="fa fa-user-plus" aria-hidden="true"></i> Sign up </Link>
                                    </li>
                                </ul>
                            }
                        </ul>
                    </ul>
                </nav>
                <div className="header-pic-container">
                    <img className="header-pic"
                         src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRMti-9yi9IgVgWl6lOGlTfnNdHiIceEnJ80Q&usqp=CAU"
                         alt="Snow"/>
                    <div className="header-pic-centered">This is my blog</div>
                </div>

            </header>

        );
    }
}
export default Header;


