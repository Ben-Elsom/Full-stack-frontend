import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

const SignUp = ({ setLoggedIn, setCookie, setErrors }) => {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    function signUpFunction(event){
        event.preventDefault()
        const signUpData = {
            email,
            first_name: firstName,
            last_name: lastName,
            phone_number: phoneNumber,
            password,
            password_confirmation: passwordConfirmation
        }
        fetch(`${process.env.REACT_APP_BACKEND}/auth/sign_up`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(signUpData)
        })
        .then(response => response.json())
        .then(responseData => {
            if (!responseData.error) {
                setCookie('JWT', responseData.jwt)
                setLoggedIn(true)
                setErrors([])
                history.push("/menu")
            } else {
                const errors = []
                Object.keys(responseData.error).forEach(key => {
                    responseData.error[key].forEach(value => {
                        errors.push(`${key.replace("_", " ")} ${value}`)
                    })
                });
                setErrors(errors)
            }
        })
    }
    return (
        <div>
            <form onSubmit={signUpFunction}>
                <label>Email:</label>
                <input onChange={(event => setEmail(event.target.value))}type="email"></input><br/>
                <label>First name:</label>
                <input onChange={(event => setFirstName(event.target.value))} type="text"></input><br/>
                <label>Last name:</label>
                <input onChange={(event => setLastName(event.target.value))} type="text"></input><br/>
                <label>Phone number</label>
                <input onChange={(event => setPhoneNumber(event.target.value))} type="number"></input><br/>
                <label>Password:</label>
                <input onChange={(event => setPassword(event.target.value))} type="password"></input><br/>
                <label>Confirm password:</label>
                <input onChange={(event => setPasswordConfirmation(event.target.value))} type="password"></input><br/>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default SignUp
