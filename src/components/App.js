import React from "react";
import Item from "./Item"
import deque from "./deque";
import main_audio from "../sound-effects/Snake Music.mp3";
import eaten_audio from "../sound-effects/mixkit-explainer-video-game-alert-sweep-236.wav"
import end_audio from "../sound-effects/mixkit-arcade-retro-jump-223.wav"
import AudioHandler from "./AudioHandler"
import "./App.css"


class App extends React.Component {
    constructor(props) {
        super(props)
        this.directions = new deque();
        this.state = {
            food: this.getRandomCell(),
            segments: [
                {
                    column: 1,
                    row: 2
                },
                {
                    column: 2,
                    row: 2
                },
                {
                    column: 3,
                    row: 2
                },
                {
                    column: 4,
                    row: 2
                },
                {
                    column: 5,
                    row: 2
                }
            ],
            speed: {
                speed_x: 1,
                speed_y: 0
            },
            forbidden_direction: "left",
            isEatenAudioPlaying: false,
            isEndAudioPlaying: false
        }


    }

    keyEventHandler = (event) => {

        if (event.keyCode === 37) {
            this.directions.insert_last("left");
        }
        else if (event.keyCode === 38 && this.state.forbidden_direction !== "top") {
            this.directions.insert_last("top");
        }
        else if (event.keyCode === 39 && this.state.forbidden_direction !== "right") {
            this.directions.insert_last("right");
        }
        else if (event.keyCode === 40 && this.state.forbidden_direction !== "bottom") {
            this.directions.insert_last("bottom")
        }

    }

    handleDirection = (direction) => {
        let forbidden_direction = this.state.forbidden_direction;

        if (direction === "left" && forbidden_direction !== "left") {
            this.setState({
                speed: {
                    speed_x: -1,
                    speed_y: 0
                },
                forbidden_direction: "right"
            })
        }
        else if (direction === "top" && forbidden_direction !== "top") {
            this.setState({
                speed: {
                    speed_x: 0,
                    speed_y: -1
                },
                forbidden_direction: "bottom"
            })
        }
        else if (direction === "right" && forbidden_direction !== "right") {
            this.setState({
                speed: {
                    speed_x: 1,
                    speed_y: 0
                },
                forbidden_direction: "left"
            })
        }
        else if (direction === "bottom" && forbidden_direction !== "bottom") {
            this.setState({
                speed: {
                    speed_x: 0,
                    speed_y: 1
                },
                forbidden_direction: "top"
            })
        }
    }

    componentDidMount = () => {

        this.movementId = setInterval(this.update, 300);
        document.addEventListener("keydown", this.keyEventHandler);
    }

    update = () => {

        let direction = this.directions.remove_first();
        let food = this.state.food;
        let isEndAudioPlaying = this.state.isEndAudioPlaying;

        if (direction !== null) {
            this.handleDirection(direction);
        }

        let segments = this.state.segments;
        const size = segments.length;
        const header = segments[size - 1];
        segments.shift();
        const column = header.column + this.state.speed.speed_x;
        const row = header.row + this.state.speed.speed_y;

        segments.push({ column: column === 21 ? 1 : (column === 0 ? 20 : column), row: row === 21 ? 1 : (row === 0 ? 21 : row) })
        if (this.endGame()) {

            segments = [segments[segments.length - 1]];
            food = this.getRandomCell();
            isEndAudioPlaying = true;
        }
        else {
            isEndAudioPlaying = false;
        }
        this.setState({
            segments: segments,
            food: food,
            isEndAudioPlaying: isEndAudioPlaying,
        })

        this.eaten();


    }



    componentWillUnmount = () => {
        clearInterval(this.movementId)
    }



    getRandomCell() {
        return {
            column: Math.floor(Math.random() * 20) + 1,
            row: Math.floor(Math.random() * 20) + 1
        }
    }

    draw() {
        const items = []
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                items.push(<Item className={"item"} />)
            }
        }
        for (let segment of this.state.segments) {
            items[(segment.row - 1) * 20 + segment.column - 1] = <Item className={"snake"} />
        }
        items[(this.state.food.row - 1) * 20 + this.state.food.column - 1] = <Item className={"food"} />
        return items
    }

    eaten = () => {
        const segments = this.state.segments;
        let size = segments.length;
        const head = segments[size - 1];
        const food = this.state.food;
       

        if (food.column === head.column && food.row === head.row) {

            const column = head.column + this.state.speed.speed_x;
            const row = head.row + this.state.speed.speed_y;
            segments.push({ column: column === 21 ? 1 : (column === 0 ? 20 : column), row: row === 21 ? 1 : (row === 0 ? 21 : row) })
            this.setState({
                segments: segments,
                food: this.getRandomCell(),
                isEatenAudioPlaying:true
            })
        }
        else{
            
            this.setState({
                isEatenAudioPlaying : false
            })
        }
    }

    endGame = () => {
        const head = this.state.segments[this.state.segments.length - 1];
        const segments = this.state.segments;
        for (let i = 0; i < segments.length - 1; i++) {
            if (segments[i].column === head.column && segments[i].row === head.row) {
                console.log("True");
                return true;
            }
        }
        return false;
    }

    render() {
        return (
            <React.Fragment>
                <AudioHandler audio={new Audio(main_audio)} can_play={true} />
                <AudioHandler audio={new Audio(eaten_audio)} can_play={this.state.isEatenAudioPlaying} />
                <AudioHandler audio={new Audio(end_audio)} can_play={this.state.isEndAudioPlaying} />
                <div className="box">
                    {this.draw()}
                </div>

            </React.Fragment>

        )
    }
}

export default App