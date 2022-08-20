import React, { Component } from "react";



class AudioHandler extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount = () => {
        if (this.props.can_play) {
            document.addEventListener("click", event => {
                this.props.audio.play();
            })
        }
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.can_play !== this.props.can_play && this.props.can_play === true) {
            this.props.audio.play();
        }
    }


    render() {
        return (
            <React.Fragment>

            </React.Fragment>
        );
    }
}

export default AudioHandler;