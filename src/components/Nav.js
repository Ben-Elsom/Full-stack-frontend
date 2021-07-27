import React from 'react'
import { Link } from 'react-router-dom'


const Nav = () => {
    return (
        <div>
            <ul>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/menu/add">New Item</Link></li>
                <li><Link to="/sign_up">Sign up</Link></li>
                <li><Link to="/sign_in">Sign in</Link></li>

            </ul>
        </div>
    )
}

export default Nav
