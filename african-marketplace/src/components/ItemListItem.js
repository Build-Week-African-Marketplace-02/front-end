import React from 'react';
import { Link } from 'react-router-dom';

const ItemListItem = (props)=> {
  const { id, name, description, location, seller, price} = props.ItemListItems

  return(<tr key={id}>
      <td>{name}</td>
      <td>{description}</td>
      <td>{location}</td>
      <td>{seller}</td>
      <td>{price}</td>
      <td>
        <Link to={`/item-list/${id}`} className="view">
          <input type="button" className="btn btn-secondary" value="View"/>
        </Link>
      </td>
  </tr>);
}

export default ItemListItem;