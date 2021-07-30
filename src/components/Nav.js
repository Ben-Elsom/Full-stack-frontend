import { Link } from 'react-router-dom'
import React, { useContext } from 'react'
import {Context} from '../App'

const Nav = ({removeCookie}) => {
    const handleLogOut = () => {
        removeCookie("JWT")
        dispatch({action: "change loggedIn", value: false})
        dispatch({action: "change user", value: {}})
    }
    const {context, dispatch} = useContext(Context)
    return (
        <div>
            <ul>
                <li><Link to="/menu">Menu</Link></li>
                {context.user.is_admin ? 
                    <li><Link to="/menu/add">New Item</Link></li> 
                    : null
                }
                {!context.loggedIn ? (
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
