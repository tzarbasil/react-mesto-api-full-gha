import React from "react"
import { Link } from "react-router-dom";

import logo from '../images/logo.svg';

export default function Header(props) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип проекта" />
            <div className="header__container">
                <p className="header__email">{props.headerEmail}</p>
                <Link className="header__login" to={props.link} onClick={props.onSignOut}> {props.linkText} </Link>
            </div>
        </header>
    )
}

