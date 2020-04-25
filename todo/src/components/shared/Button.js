import React from 'react'
import { Link } from 'react-router-dom'


const Button = (props) => {
    if(props.href) {
        return (    
            <a
                className={`btn btn--${props.size || 'default'}`}
                href={props.href}
                >
                {props.children}
            </a>
        )
    }
    if (props.to) {
        return (
            <Link
                to={props.to}
                exact={props.exact}
                className={`btn btn--${props.size || 'default'}`}
                
                >
                {props.children}
            </Link>
        )
    }
    return (
        <button
            type={props.type}
            onClick={props.onClick}
            className={`btn-submit btn--${props.size || 'default'} ${props.class}`}
            disabled={props.disabled}
            >
            <span className={`btn-content ${props.btnContentClass}`}>{props.children}</span>
        </button>
    )
}

export default Button;
