import React from 'react';
import {Link} from "react-router-dom";
import {doLogout} from "../utils/server/User";
import "../styles/Header.css"
import SearchBar from "./searchBar";

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
                <div className="custom-padding">
                    <nav>
                        <ul className="tool-bar">
                            <li><Link to="/home">HOME</Link></li>
                            <li><Link to="/about">ABOUT</Link></li>
                            {/*<li>  <SearchBar/></li>*/}
                            {this.props.user.isLoggedIn
                                ?
                                <div>
                                    <li><Link to="/new post">NEW POST</Link></li>
                                    <li><Link to="/my posts">MY POSTS</Link></li>
                                </div>
                                :null}
                        </ul>
                        {this.props.user.isLoggedIn
                            ?
                            <ul className="logged-in">
                                <li className="logout-link"><Link to="/" onClick={this.handleLogout}>Logout</Link></li>
                                <li className="welcome-user">welcome, {this.props.user.name}</li>
                            </ul>
                            :
                            <ul className="not-logged-in">
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/signUp">Sign up</Link></li>
                            </ul>
                        }
                    </nav>
                </div>
            </header>
        );
    }
}
export default Header;