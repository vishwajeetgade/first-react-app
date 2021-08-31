import React, { Component } from 'react'

export default class GuessFlag extends Component {
    constructor(props){
        super(props);
        this.state = {
            countries: []
        }
    }

    componentDidMount(){
        const baseURL = 'https://restcountries.eu/rest/v2/all';
        fetch(baseURL)
        .then(data => data.json())
        .then(countries => this.setState({countries}))
    }

    render() {
        return (
            <div className="text-center mt-5">
                <h4>Guess Country Game</h4>
                <img src="https://geology.com/world/world-map.gif" className="img-fluid" alt="world map"/>
            </div>
        )
    }
}
