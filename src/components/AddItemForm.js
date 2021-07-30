import React, {useEffect, useState, useContext} from 'react'
import { useHistory } from "react-router-dom";
import {Context} from '../App'
import { expand_errors } from './helpers/methods';

const AddItemForm = ({cookies}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [available, setAvailable] = useState(false)
    const [price, setPrice] = useState("")
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId ] = useState(``)
    const {dispatch} = useContext(Context)
    

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND+"/categories")
        .then(response => response.json())
        .then(categories => {
            setCategories(categories)
            setCategoryId(categories[0].id)
        })
        .catch(error => console.log(error))


    },[])


    const history = useHistory()
    function addItem(event) {
        event.preventDefault()
        const { target } = event 
        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("available", available)
        formData.append("price", price)
        formData.append("thumbnail", document.getElementById("fileUpload").files[0])
        formData.append("category_id", categoryId)
    
        
        fetch(`${process.env.REACT_APP_BACKEND}/menu`, {
            method: "POST", 
            headers: {
                "Authorization": `Bearer ${cookies.JWT}`,
            }, 
            body: formData
        })
        .then(data => data.json())
        .then(response => {
            if (response.id) {
                dispatch({action: "change menuItems", value: response})
                history.push("/menu")
            } else {
                // TODO - TURN into function
                dispatch({action: "change errors", value: expand_errors(response) })
            }
        })
        .catch(error => {
            console.log(error)
        })


        
    }
    return (
        <form id="foo" onSubmit={addItem}>
            <label>Name:</label>
            <input value={name} onChange={e => setName(e.target.value)} type="text"/><br/>
            <label>Available?:</label>
            <input value={available} onChange={e => setAvailable(e.target.checked)} type="checkbox"/ ><br/>
            <label>Description?:</label>
            <input value={description} onChange={e => setDescription(e.target.value)}type="text" /><br/>
            <label> Price:</label>
            <input value={price} onChange={e => setPrice(e.target.value)}type="decimal" /><br/>
            <label>Thumbnail:</label>
            <label>Category</label>
            <select onChange={e => setCategoryId(e.target.value)}>
                {categories.map((category, index) => (
                    <option key={index}value={category.id}>{category.name}</option>
                ))}
            </select><br/>
            <input id="fileUpload" type="file"></input><br/>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default AddItemForm
