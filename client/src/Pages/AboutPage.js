import React from 'react';
import {checkLogin} from "../utils/server/User";

class AboutPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>About me </h1>
                <p>
                    this is the about me page<br/>
                    here you read stuff about me.
                </p>
            </div>
        );
    }
}
export default AboutPage;