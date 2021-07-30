import { Link } from 'react-router-dom'
import { Context } from '../App';
import React, { useContext } from 'react'
import { useCookies } from 'react-cookie';


const Menu = ({name, description, available, price, category, image_url, id}) => {
  console.log(image_url)
  const {context, dispatch} = useContext(Context)
  const [cookies, setCookie, removeCookie ] = useCookies("JWT")

  async function DeleteItem(event){
    event.preventDefault()
    const response = await fetch(`${process.env.REACT_APP_BACKEND}/menu/${id}`, {
      headers: {
        "Authorization": `Bearer ${cookies.JWT}`,
        "Content-Type": "application/json"
      },
      method: "DELETE"
    })
     if (response.status == 200) {
       const newMenuItems = context.menuItems.filter(item => item.id !== id)
       dispatch({action: "change menuItem", value: newMenuItems})
     } else {
       console.log("failed", response) 
     }
  }
  // function EditItem(event){
  //   event.preventDefault()
  //   history.push(`/menu/${id}/edit`)
  // }
 
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
