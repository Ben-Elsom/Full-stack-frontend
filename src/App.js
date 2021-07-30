import React, {useState, useEffect, createContext, useReducer} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import MenuItem from "./components/MenuItem"
import AddItemForm from "./components/AddItemForm"
import SignUp from "./components/signUp"
import SignIn from "./components/signIn"
import Nav from "./components/Nav"
import Edit from "./components/Edit"
import {useCookies} from 'react-cookie'

const initialState = {
  menuItems: [],
  errors: [],
  user: {},
  loggedIn: false
}

function reducer(state, payload) {
  console.log(payload)
  switch (payload.action) {
    case "change contextValue": {
      return {...state, contextValue: payload.value}
    }
    case "change errors":{
      return {...state, errors: payload.value}
    }
    case "change user":{
      return {...state, user: payload.value}
    }
    case "change loggedIn":{
      return {...state, loggedIn: payload.value}
    }
    case "change menuItems":{
      return {...state, menuItems: payload.value}
    }
    default: {
      return {...state}
    }
  }
}


export const Context = createContext(initialState)



function App() {
  const [cookies, setCookie, removeCookie ] = useCookies("JWT")
  const [user, setUser] = useState({})
  const [context, dispatch] = useReducer(reducer, {...initialState, loggedIn: cookies.JWT ? true : false})
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND}/menu`)
    .then(response => response.json())
    .then(data => {
      dispatch({action: "change menuItems", value: data})
    })
      .catch(error => console.log(error))

    if (cookies.JWT){
      fetch(`${process.env.REACT_APP_BACKEND}/auth/user`, {
        headers: {
            "Authorization": `Bearer ${cookies.JWT}`,
        },
    })
    .then(response => response.json())
    .then(data => {
      // DISPATCH
      setUser(data.user)
      // set logged in with context
    })
    }
  }, [])

  return ( 
  <Context.Provider value={{context, dispatch}}> 
    {console.log(context.errors)}
    {context.errors.length > 0 ? (
      <div>
        <ul>
          {context.errors.map((error) => (
            <li>{error}</li>
          ))
          }
        </ul>
      </div>
      ) : null
    }
      <Router>
        <Nav removeCookie={removeCookie} />
        <Route exact path="/menu/add" >
          <AddItemForm cookies={cookies} />
        </Route>
        <Route exact path="/menu/:id/edit" render={() => <Edit cookies={cookies}/>}/>
        <Route path="/menu">
          {context.menuItems.map((item) => { 
            // change to context user
            if (item.available || user.is_admin) {
              return <MenuItem {...item} />
            }
          })}
        </Route>
        <Route path="/sign_up" render={() => <SignUp  setCookie={setCookie}  />}/ >
        <Route path="/sign_in" render={ () => <SignIn setCookie={setCookie} />} />
      </Router>

  </Context.Provider>
  );
}

export default App;
