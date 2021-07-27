import React from 'react'

const signup = () => {
    function signUpFunction(event){
        event.preventDefault()
        
    }
    return (
        <div>
            <form onSubmit={signUpFunction}>
                <label>Email:</label>
                <input type="email"></input><br/>
                <label>First name:</label>
                <input type="text"></input><br/>
                <label>Last name:</label>
                <input type="text"></input><br/>
                <label>Phone number</label>
                <input type="number"></input><br/>
                <label>Password:</label>
                <input type="password"></input><br/>
                <label>Confirm password:</label>
                <input type="password"></input><br/>
                <input type="submit"></input>

            </form>
        </div>
    )
}

export default signup
