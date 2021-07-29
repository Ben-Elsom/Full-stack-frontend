import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";

const AddItemForm = ({setMenuItems, menuItems, cookies, setErrors}) => {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [available, setAvailable] = useState(false)
    const [price, setPrice] = useState("")
    const [categories, setCategories] = useState([])
    const [categoryId, setCategoryId ] = useState(``)

    // console.log(categories[0].id)
    // want to set a default value for categoryid but it won't work on startup 

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
            console.log(response)
            if (response.id) {
                console.log("this is successful")
                setMenuItems([...menuItems, response])
                history.push("/menu")
            } else {
                console.log("there was an error")
                const errors = []
                Object.keys(response.error).forEach(key => {
                    response.error[key].forEach(value => {
                        errors.push(`${key.replace("_", " ")} ${value}`)
                    })
                });
                setErrors(errors)
            }
        })
        .catch(error => {
            console.log("erorrful")
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
                {categories.map(category => (
                    <option value={category.id}>{category.name}</option>
                ))}
            </select><br/>
            <input id="fileUpload" type="file"></input><br/>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default AddItemForm
