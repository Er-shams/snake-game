import React from "react";
import "./Item.css"
class Item extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className={this.props.className}>

            </div>
        )
    }
}

export default Item