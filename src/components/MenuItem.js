const Menu = (props) => {
  const {name, description, available, price, category_id, image_url} = props.data
    return (
      <div style={{border: '2px solid red', width: '50%'}}>
              <h1>{name}</h1>
              <ul>
                <li>{description}</li>
                <li>{available.toString()}</li>
                <li>{price}</li>
                <li>{category_id}</li>
              </ul>
              <img width="200px" src={image_url}/>
      </div>
          )}

export default Menu
