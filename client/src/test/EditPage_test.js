import React from 'react';
import EditComp_test from "./EditComp_test";

class EditPage_test extends React.Component {
    constructor(props) {
        super(props);
        this.post = {
            title:"",
            content:""
        }
    }
    render(){
        return (
            <div>
                <EditComp_test newPost={true} {...this.props}/>
            </div>
        );
    }
}

export default EditPage_test;





