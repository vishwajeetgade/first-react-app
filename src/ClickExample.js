import React, { Component } from 'react'

export default class ClickExample extends Component {
    constructor(props){
        super(props);
        this.state = {name:"Hinata"};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.setState((prevState, props)=>({
           name: prevState.name.toLowerCase()
        }))
    }
    render() {
        return (
            <div>
                <p>{this.state.name}</p>
                <button className="btn btn-md btn-primary" onClick={this.handleClick} >lowercase</button>
                <button className="btn btn-md btn-primary" onClick={()=>(this.setState({name:"HINATA"}))} >UPPERCASE2</button>
            </div>
        )
    }
}
