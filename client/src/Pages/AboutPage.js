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
            <div className="aboutPageBody">
                <section className="introduction">
                    <div className="starcontainer">

                        <div className="images">
                        <img className="selfImg" src="https://firebasestorage.googleapis.com/v0/b/blog-91cd0.appspot.com/o/BlogImages%2Fdavid.png?alt=media&token=82559d90-23cf-401a-9146-e25a18a4408a"/>
                            <h2 className="AboutUsHeader">About Us</h2>
                        <img  className="selfImg" src="https://firebasestorage.googleapis.com/v0/b/blog-91cd0.appspot.com/o/BlogImages%2Fudi.png?alt=media&token=16188248-9159-469b-927e-b383f849665d"/>
                        </div>
                        <i className="fa fa-star fa-2x"></i>
                        <hr className="star"></hr>
                    </div>
                    <p>We are David Davidov and Udi Rahav, IDC students who enjoy solving riddles and challenges
                        and creating cool projects like this fun blog. </p>

                </section>
                <h1>More About Us</h1>

                <section className="questions">
                    <h1>David Davidov</h1>
                    <h2>What is important to you?</h2>
                    <p>My family always comes first, and I really believe in doing things that bring joy to others.</p>
                    <h2>What are your hobbies?</h2>
                    <p>I love cooking, hiking, and DAVID WHAT ARE YOUR HOBBIES?.</p>
                    <h2>What is your dream job?</h2>
                    <p>I want to be working in an environment that challenges me and makes me think outside the box.</p>
                </section>

                <section className="questions">
                    <h1>Udi Rahav</h1>
                    <h2>What inspires you?</h2>
                    <p>Education, family, and working toward meaningful goals.</p>
                    <h2>What are your hobbies?</h2>
                    <p>I love playing sports (especially basketball), motorcycles, and video games.</p>
                    <h2>What is your dream job?</h2>
                    <p>I would love to be putting my skills toward developing software that can change lives and make a
                        real difference in the world.</p>
                </section>

                <footer className="content-footer">
                    <p>Say hi to me on these social networks:</p>
                    <ul className="social">
                        <li className="social-media-ele"><a href="https://github.com/" target="_blank" className="about-social-media"><FontAwesomeIcon icon={faGithub} size="3x" color ="white"/></a></li>
                        <li className="social-media-ele"> <a href="https://facebook.com/" target="_blank" className="about-social-media"><FontAwesomeIcon icon={faFacebook} size="3x" /></a></li>
                        <li className="social-media-ele"><a href="https://linkedin.com/" target="_blank" className="about-social-media"><FontAwesomeIcon icon={faLinkedin} size="3x" /></a></li>
                        <li className="social-media-ele"><a href="mailto:someone@example.com" target="_blank" className="about-social-media"><FontAwesomeIcon icon={faEnvelope} size="3x" color ="white"/></a></li>
                        <li className="social-media-ele"><a href="https://drive.google.com/uc?export=download&id=1Ly0P8U6_p-ZlqzZeOv1WDRH2XYklxM21" className="about-social-media" download><FontAwesomeIcon icon={faFileAlt} size="3x"  color ="white"/></a></li>
                    </ul>

                </footer>
            </div>

        );
    }
}
export default AboutPage;