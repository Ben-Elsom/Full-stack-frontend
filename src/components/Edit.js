import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
const Edit = ({menuItems}) => {
    const {id} = useParams()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [available, setAvailable] = useState(false)
    const [price, setPrice] = useState("")
    useEffect(() => {
        console.log(menuItems)
        console.log(id)
        if (menuItems.length > 0){
            const menuItem = menuItems.find(item => item.id == id)
            setName(menuItem.name)
            setDescription(menuItem.description)
            setAvailable(menuItem.available)
            setPrice(menuItem.price)
            console.log("ID has changed")
        } else {
            console.log(process.env.REACT_APP_BACKEND)
            fetch(`${process.env.REACT_APP_BACKEND}/menu/${id}`)
            .then(response => response.json())
            .then(menuItem => {
                setName(menuItem.name)
                setDescription(menuItem.description)
                setAvailable(menuItem.available)
                setPrice(menuItem.price)
            })
        }
    }, [id])


    function editItem(event) {
        event.preventDefault()
        const newMenuItem = {
            name,
            description,
            available,
            price,
            image_url: "#"}
            
        fetch(`${process.env.REACT_APP_BACKEND}/menu/${id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(newMenuItem)
        })
    }
    return (
        <div>
            <form onSubmit={editItem}>
            <label>Name:</label>
            <input value={name} onChange={event => setName(event.target.value)}type="text"></input><br/>
            <label>Available?:</label>
            <input value={available} onChange={event => setAvailable(event.target.value)} type="checkbox"></input><br/>
            <label>Description?:</label>
            <input value={description} onChange={event => setDescription(event.target.value)} type="text"></input><br/>
            <label>Price:</label>
            <input value={price} onChange={event => setPrice(event.target.value)} type="decimal"></input><br/>
            <label>Thumbnail:</label>
            <input type="file"></input><br/>
            <input type="submit" value="Submit" />
        </form>
        </div>
    )
}

export default Edit
