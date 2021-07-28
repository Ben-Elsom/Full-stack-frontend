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

  console.log(cookies)

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/menu`)
    .then(response => response.json())
    .then(data => setMenuItems(data))

  }, [])



  return ( 
  <>
    <Router>
      <Nav setLoggedIn={setLoggedIn} loggedIn={loggedIn} removeCookie={removeCookie} />
      <Route exact path="/menu/add" >
        <AddItemForm setMenuItems={setMenuItems} menuItems={menuItems} />
      </Route>
      <Route exact path="/menu/:id/edit" render={() => <Edit menuItems={menuItems} />}/>
      <Route path="/menu">
        {menuItems.map((item) => { 
          return <MenuItem data={item} setMenuItems={setMenuItems} menuItems={menuItems}/>
        })}
      </Route>
      <Route path="/sign_up" render={() => <SignUp setLoggedIn={setLoggedIn} setCookie={setCookie}  />}/ >
      <Route path="/sign_in" component={SignIn}/>
    </Router>

  </>
  );
}

export default App;
