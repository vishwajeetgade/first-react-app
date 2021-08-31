import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Anime extends Component {
    constructor(props){
        super(props);
    }

    render() {
        
        const {skill} = this.props;

        return (
            <li>{skill}</li>
        )
    }
}

Anime.propTypes = {
    char: PropTypes.array

}

Anime.defaultProps = {
    
}



