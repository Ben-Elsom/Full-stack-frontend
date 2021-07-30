import { useEffect, useState, useContext } from 'react'
import { useHistory, useParams } from "react-router-dom"
import {Context} from '../App'
import { expand_errors } from './helpers/methods'

const Edit = ({cookies}) => {
    const history = useHistory()
    const {id} = useParams()
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [available, setAvailable] = useState(false)
    const [price, setPrice] = useState("")
    const {context, dispatch} = useContext(Context)

    useEffect(() => {
        if (context.menuItems.length > 0){
            const menuItem = context.menuItems.find(item => item.id == id)
            setName(menuItem.name)
            setDescription(menuItem.description)
            setAvailable(menuItem.available)
            setPrice(menuItem.price)
        } else {
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
        }


        fetch(`${process.env.REACT_APP_BACKEND}/menu/${id}`, {
            method: "PUT", 
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookies.JWT}`
            }, 
            body: JSON.stringify(newMenuItem)
        }).then(data => data.json())
        .then(response => {
            if (response.id) {
                const array = [...context.menuItems]
                const index = array.findIndex(item => item.id == response.id)
                array[index] = response
                dispatch({action: "change menuItems", value: array})
                history.push("/menu")
            } else {
                dispatch({action: "change errors", value: expand_errors(response) })
            }
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
            <input type="submit" value="Submit" />
        </form>
        </div>
    )
}

export default Edit
