const signIn = () => {
    function signInMethod(event) {
        event.preventDefault()
    }
    return (
        <div>
            <form onSubmit={signInMethod}>
                <label>Email</label>
                <input type="email"></input><br/>
                <label>Password</label>
                <input type="password"></input><br/>
                <input type="submit"></input>
            </form>
        </div>
    )
}

export default signIn
