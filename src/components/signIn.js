import { useState } from 'react'
import { useHistory } from "react-router-dom";

const SignIn = ({setErrors, setLoggedIn, setCookie, setUser}) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()

    function signInMethod(event) {
        event.preventDefault()
        const signInData = {
            email,
            password
        }
        fetch(`${process.env.REACT_APP_BACKEND}/auth/sign_in`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(signInData)
        })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.error){
                setErrors([responseData.error])
            } else {
                setCookie('JWT', responseData.jwt)
                setLoggedIn(true)
                setUser(responseData.user)
                history.push("/menu")
            }}
        )
    }
    return (
        <div>
            <form onSubmit={signInMethod}>
                <label>Email</label>
                <input onChange={event => setEmail(event.target.value)} type="email"></input><br/>
                <label>Password</label>
                <input onChange={event => setPassword(event.target.value)} type="password"></input><br/>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default SignIn
