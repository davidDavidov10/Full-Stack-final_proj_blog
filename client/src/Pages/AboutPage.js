import React from 'react';
import Typucal from 'react-typical'

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
                    <Typucal
                        loop={Infinity}
                        wrapper="b"
                        steps=
                            {[
                            'student', 2000 ,
                            'developer', 2000 ,
                            'biker', 2000 ,
                            'basketball player', 2000
                            ]}
                    />
                    <br/>
                </p>
            </div>
        );
    }
}
export default AboutPage;