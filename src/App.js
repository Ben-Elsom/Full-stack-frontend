import React, {useState, useEffect} from 'react';
import MenuItem from "./components/MenuItem"


function App() {
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
    .then(response => response.json())
    .then(data => setMenuItems(data))

  }, [])
  return ( 
  <>
    {menuItems.map((item) => { 
      return <MenuItem name={item.name} description={item.description} available={item.available} price={item.price} category_id={item.category_id} image_url={item.image_url}/>
    })}
  </>
  );
}

export default App;
