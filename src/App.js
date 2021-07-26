import React, {useState, useEffect} from 'react';
import MenuItem from "./components/MenuItem"
import AddItemForm from "./components/AddItemForm"


function App() {
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/api/menu")
    .then(response => response.json())
    .then(data => setMenuItems(data))

  }, [])



  return ( 
  <>
    <AddItemForm setMenuItems={setMenuItems} menuItems={menuItems} />
    {console.log(menuItems)}
    {menuItems.map((item) => { 
      return <MenuItem data={item}/>
    })}
  </>
  );
}

export default App;
