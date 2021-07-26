import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom"
import MenuItem from "./components/MenuItem"
import AddItemForm from "./components/AddItemForm"
import SignUp from "./components/Signup"
import SignIn from "./components/SignIn"
import Nav from "./components/Nav"


function App() {
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/menu")
    .then(response => response.json())
    .then(data => setMenuItems(data))

  }, [])



  return ( 
  <>
    <Router>
      <Route path="/" component={Nav}></Route>
      <Route path="/menu/add" >
        <AddItemForm setMenuItems={setMenuItems} menuItems={menuItems} />
      </Route>
      <Route path="/menu">
        {menuItems.map((item) => { 
          return <MenuItem data={item} setMenuItems={setMenuItems} menuItems={menuItems}/>
        })}
      </Route>
      <Route path="/sign_up" component={SignUp}/>
      <Route path="/sign_in" component={SignIn}/>
    </Router>
    
  </>
  );
}

export default App;
