import React from 'react'
import { Link } from 'react-router-dom'

const Nav = ({loggedIn, setLoggedIn, removeCookie, user, setUser}) => {
    const handleLogOut = () => {
        removeCookie("JWT")
        setLoggedIn(false)
        setUser({})
    }
    return (
        <div>
            <ul>
                <li><Link to="/menu">Menu</Link></li>
                {user.is_admin ? 
                    <li><Link to="/menu/add">New Item</Link></li> 
                    : null
                }
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
