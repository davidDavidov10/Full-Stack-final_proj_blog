import React, {Component, useState} from "react"
import {storage} from "./firebaseStorage";

export default class ReactFirebaseFileUpload extends Component{
    constructor(props) {
        super(props);
        this.state={
            img:null
        }
    }
    handleChange = e => {
        if (e.target.files[0]) {
            this.setState({img:e.target.files[0]})
        }
    };

    handleUpload = () => {
        const uploadTask = storage.ref(`profileImages/${this.state.img.name}`).put(this.state.img);
        uploadTask.on(
            "state_changed",
            snapshot => {
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref(`profileImages/${this.state.img.name}`)
                    .getDownloadURL()
                    .then(url => {
                        console.log(url);
                    });
            }
        );
    };

    render() {
        return (
            <div>
                <input type="file" onChange={this.handleChange} />
                <button onClick={this.handleUpload}>Upload</button>
                {/*{url}*/}
            </div>
        );
    }
}

