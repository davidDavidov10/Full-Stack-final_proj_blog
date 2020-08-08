import React from 'react';

import MainSection from "../Components/MainSection";
import Sidebar from "../Components/Sidebar";

import '../styles/HomePage.css';
import '../styles/MainSection.css'
import '../styles/Sidarbar.css'
import {checkLogin} from "../utils/server/User";


class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <MainSection/>
                <Sidebar/>
            </div>
        );
    }
}

export default HomePage;