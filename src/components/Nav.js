import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({loggedIn, setLoggedIn, removeCookie}) => {
    const handleLogOut = () => {
        removeCookie("JWT")
        setLoggedIn(false)
    }
    return (
        <div>
            <ul>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/menu/add">New Item</Link></li>
                {!loggedIn ? (
                    <>
                        <li><Link to="/sign_up">Sign up</Link></li>
                        <li><Link to="/sign_in">Sign in</Link></li>
                    </>
                ): <button onClick={handleLogOut}>Log out</button>}

            </ul>
        </div>
    )
}

export default Nav
