import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import MenuItem from "./components/MenuItem"
import AddItemForm from "./components/AddItemForm"
import SignUp from "./components/SignUp"
import SignIn from "./components/SignIn"
import Nav from "./components/Nav"
import Edit from "./components/Edit"
import {useCookies} from 'react-cookie'


function App() {
  const [cookies, setCookie, removeCookie ] = useCookies("JWT")
  const [menuItems, setMenuItems] = useState([])
  const [loggedIn, setLoggedIn] = useState(cookies.JWT ? true : false)
  const [errors, setErrors] = useState([])
  const [user, setUser] = useState({})
  

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/menu`)
    .then(response => response.json())
    .then(data => setMenuItems(data))

    // TODO
    // Fetch request to get_user
    if (cookies.JWT){
      fetch(`${process.env.REACT_APP_BACKEND}/auth/user`, {
        headers: {
            "Authorization": `Bearer ${cookies.JWT}`,
        },
    })
    .then(response => response.json())
    .then(data => setUser(data))

    }






  }, [])

  return ( 
  <> {errors.length > 0 ? (
    <div>
      <ul>
        {errors.map((error) => (
          <li>{error}</li>
        ))
        }
      </ul>
    </div>
    ) : null
  }
      <Router>
        <Nav user={user} setUser={setUser} setLoggedIn={setLoggedIn} loggedIn={loggedIn} removeCookie={removeCookie} />
        <Route exact path="/menu/add" >
          <AddItemForm setErrors={setErrors} setMenuItems={setMenuItems} menuItems={menuItems} cookies={cookies} />
        </Route>
        <Route exact path="/menu/:id/edit" render={() => <Edit menuItems={menuItems} />}/>
        <Route path="/menu">
          {menuItems.map((item) => { 
            if (item.available || user.is_admin) {
              return <MenuItem data={item} setMenuItems={setMenuItems} menuItems={menuItems}/>
            }
          })}
        </Route>
        <Route path="/sign_up" render={() => <SignUp  setUser={setUser} setErrors={setErrors}setLoggedIn={setLoggedIn} setCookie={setCookie}  />}/ >
        <Route path="/sign_in" render={ () => <SignIn setUser={setUser} setErrors={setErrors} setLoggedIn={setLoggedIn} setCookie={setCookie} />} />
      </Router>

  </>
  );
}

export default App;
