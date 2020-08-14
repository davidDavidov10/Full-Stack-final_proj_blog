import React from 'react';
import {Link} from "react-router-dom";

import Typucal from 'react-typical';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faGithub, faLinkedin, faFacebook,} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope, faFileAlt}from "@fortawesome/free-solid-svg-icons"

import GitHubIcon from '@material-ui/icons/GitHub';
import ListItem from '@material-ui/core/ListItem';


import "../styles/AboutPage.css"


class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>About me </h1>

                <p>
                    Hey, I'm Udi Rahav,
                    I'm a { }
                    <Typucal loop={Infinity} wrapper="b"
                        steps={['student', 2000 , 'developer', 2000 , 'biker', 2000 , 'basketball player', 2000]}/>
                    <br/>
                </p>
                    <a href="https://github.com/" target="_blank" className="about-social-media"><FontAwesomeIcon icon={faGithub} size="3x" color ="black"/></a>
                    <a href="https://facebook.com/" target="_blank" className="about-social-media"><FontAwesomeIcon icon={faFacebook} size="3x" /></a>
                    <a href="https://linkedin.com/" target="_blank" className="about-social-media"><FontAwesomeIcon icon={faLinkedin} size="3x" /></a>
                    <a href="mailto:someone@example.com" target="_blank" className="about-social-media"><FontAwesomeIcon icon={faEnvelope} size="3x" color ="green"/></a>
                    <a href="" className="about-social-media" download="my resume"><FontAwesomeIcon icon={faFileAlt} size="3x"  color ="brown"/></a>
            </div>
        );
    }
}
export default AboutPage;