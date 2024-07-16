import { Component } from "react";

class Message extends Component{
    constructor (props){
        super(props)
        this.state={
            messsage: props.messsage
        }
    }

    changeMessage(){
        this.setState({
            messsage:"Thanks for subscribing"
        })
    }

    render(){
        return (
            <div>
                <h1>{this.state.messsage}</h1>
                <button onClick={()=>this.changeMessage()}>Subscribe</button>
            </div>
        )
    }
}

export default Message;