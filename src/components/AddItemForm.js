import React from 'react'

const AddItemForm = (props) => {
    function addItem(event) {
        event.preventDefault()
        const {setMenuItems, menuItems} = props
        const { target } = event 
        const newMenuItem = {user_id: 9, name: target[0].value, description: target[2].value, available: target[1].checked, price: target[3].value, image_url: "#", category_id: 25}
        setMenuItems([...menuItems, newMenuItem])
        // async function addItemtoDB() {
            fetch("http://localhost:3000/api/menu", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(newMenuItem)})
        // }
        // console.log(addItemtoDB())

       
   
    }
    return (
        <form onSubmit={addItem}>
            <label>Name:</label>
            <input type="text"></input><br/>
            <label>Available?:</label>
            <input type="checkbox"></input><br/>
            <label>Description?:</label>
            <input type="text"></input><br/>
            <label>Price:</label>
            <input type="decimal"></input><br/>
            <label>Thumbnail:</label>
            <input type="file"></input><br/>
            <input type="submit" value="Submit" />
        </form>
    )
}

export default AddItemForm
