const Menu = (props) => {
    return (
      <>
              <h1>{props.name}</h1>
              <ul>
                <li>{props.description}</li>
                <li>{props.available.toString()}</li>
                <li>{props.price}</li>
                <li>{props.category_id}</li>
              </ul>
              <img width="200px" src={props.image_url}/>
      </>
          )}

export default Menu
