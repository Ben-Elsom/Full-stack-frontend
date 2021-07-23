import React, {useState, useEffect} from 'react';

function App() {
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
    .then(response => response.json())
    .then(data => setMenuItems(data))

  }, [])
  return ( 
  <>
    {menuItems.map((menuItem)=>( 
    <div key={menuItem.id}>
        {console.log(menuItems)}

        <h1>{menuItem.name}</h1>
        <ul>
          <li>{menuItem.description}</li>
          <li>{menuItem.available.toString()}</li>
          <li>{menuItem.price}</li>
          <li>{menuItem.category_id}</li>
        </ul>
        <img width="200px" src={menuItem.image_url}/>
      </div>
    ))}
  
  </>
  );
}

export default App;
