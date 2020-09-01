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
                            <h2 className="AboutUsHeader">About us</h2>
                        <img  className="selfImg" src="https://firebasestorage.googleapis.com/v0/b/blog-91cd0.appspot.com/o/BlogImages%2Fudi.png?alt=media&token=16188248-9159-469b-927e-b383f849665d"/>
                        </div>
                        <i className="fa fa-star fa-2x"></i>
                        <hr className="star"></hr>
                    </div>
                    <p>We are IDC students the want grade of 100 in this course. </p>

                    <p>It is my passion to conceptualize, develop, and deploy ideas to this great environment we
                        call the internet. I am an advocate for Higher Education advancement and when I set my goals
                        I sink my teeth into them. </p>
                </section>

                <section className="location">
                    <h1>Where I’m From</h1>
                    <p>I was born in the Bronx raised in Spanish Harlem and currently reside in Naugatuck CT.</p>
                </section>

                <section className="questions">
                    <h1>More About us</h1>
                    <h2>What is important to you?</h2>
                    <p>Aside from my family education is extremely important to me and has always been a huge
                        component of my growth.</p>
                    <h2>What are your favorite hobbies?</h2>
                    <p>I enjoy playing Ice Hockey. I'm a huge wrestling fan and love attending Wrestle Mania. I also
                        enjoy trying new Vegan foods and traveling.</p>
                    <h2>What is your dream job?</h2>
                    <p>I'd love to take my new freelance career and turn it into a fullt-time gig.</p>
                    <h2>What music have you been listening to lately?</h2>
                    <p>I've been listening to the Focus playlist on Spotify.</p>
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