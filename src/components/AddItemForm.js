import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";

const AddItemForm = (props) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [available, setAvailable] = useState(false)
    const [price, setPrice] = useState("")


    const history = useHistory()
    function addItem(event) {
        event.preventDefault()
        const {setMenuItems, menuItems} = props
        const { target } = event 
        const newMenuItem = {
            user_id: 9, 
            name, 
            description,
            available,
            price,
            image_url: "#", category_id: 25
        }
        fetch(`${process.env.REACT_APP_BACKEND}/menu`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(newMenuItem)})
            .then(data => data.json)
            .then(response => setMenuItems([...menuItems, newMenuItem]))
        history.push("/menu")
    }
    return (
        <form onSubmit={addItem}>
            <label>Name:</label>
            <input value={name} onChange={e => setName(e.target.value)} type="text"/><br/>
            <label>Available?:</label>
            <input value={available} onChange={e => setAvailable(e.target.checked)} type="checkbox"/ ><br/>
            <label>Description?:</label>
            <input value={description} onChange={e => setDescription(e.target.value)}type="text" /><br/>
            <label> Price:</label>
            <input value={price} onChange={e => setPrice(e.target.value)}type="decimal" /><br/>
            <label>Thumbnail:</label>
            <input type="file"></input><br/>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default AddItemForm
