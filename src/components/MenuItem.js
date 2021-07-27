import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";


const Menu = (props) => {
  const {name, description, available, price, category, image_url, id} = props.data
  const {setMenuItems, menuItems} = props
  const history = useHistory
  async function DeleteItem(event){
    event.preventDefault()
    console.log(id)
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/menu/${id}`, {method: "DELETE"})
    response.status == 200 ? setMenuItems(menuItems.filter(item => item.id !== id)) : console.log("failed", response) 
  }
  function EditItem(event){
    event.preventDefault()
    history.push(`/menu/${id}/edit`)
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
              <Link to={`/menu/${id}/edit`}>Edit</Link>

      </div>
          )}

export default Menu
