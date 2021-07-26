import { Link } from 'react-router-dom'

const Menu = (props) => {
  const {name, description, available, price, category, image_url, id} = props.data
  const {setMenuItems, menuItems} = props
  async function DeleteItem(event){
    event.preventDefault()
    console.log(id)
    const response = await fetch(`http://localhost:3000/api/menu/${id}`, {method: "DELETE"})
    response.status == 200 ? setMenuItems(menuItems.filter(item => item.id != id)) : console.log("failed", response) 
  }
    return (
      <div style={{border: '2px solid red', width: '50%'}}>
              <h1>{name}</h1>
              <ul>
                <li>Description: {description}</li>
                <li>Available?: {available.toString()}</li>
                <li>Price: {price}</li>
                <li>Category: {category}</li>
              </ul>
              <img width="200px" src={image_url}/>
              <button onClick={DeleteItem}>Delete Item</button>
      </div>
          )}

export default Menu
