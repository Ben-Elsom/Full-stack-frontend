const Menu = (props) => {
  const {name, description, available, price, category, image_url} = props.data
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
      </div>
          )}

export default Menu
