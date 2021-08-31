import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link, Route } from 'react-router-dom';


export default class NavBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/">
                            <img src="./nami_favicon.jpg" alt="" width="30" height="24" className="d-inline-block align-text-top" />
                            Bootstrap
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/todo">To-do</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/randomremove">Random Remove</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/cardgame">CardGame</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/coloredboxes">coloredboxes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/click">Casing</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/hackernews">HackerNews</Link>
                                </li>
                                <div className="d-flex">

                                <Route exact path="/" render={() =>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="#" onClick={this.props.onShowForm}>New Character</Link>
                                    </li>
                                } />
                                <Route exact path="/cardgame" render={() =>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="#" onClick={this.props.onResetCard}>Reset Card Game</Link>
                                    </li>
                                } />
                                </div>


                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

NavBar.propTypes = {
    onShowForm: PropTypes.func,
    onResetCard: PropTypes.func
}

NavBar.defaultProps = {
    onShowForm() { },
    onResetCard() { }
}






