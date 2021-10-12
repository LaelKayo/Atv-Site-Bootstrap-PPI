import React from 'react'

export default function NavItem(props){

    if(props.render){
        return(
            <li className="nav-item active">
                <a className="nav-link" onClick={props.onClick} href={props.href}>{props.label}<span className="sr-only">(current)</span></a>
            </li>
        )
    }
    return (
        false
        )
}