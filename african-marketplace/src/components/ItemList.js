import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const ItemList = () => {

  const [items, setItems] = useState([])
  const { push } = useHistory();

  useEffect(() => {
    const getItems = () => {
      axios.get('https://african-marketplace-44.herokuapp.com/api/items')
        .then(res => {
          setItems(res.data)
          console.log(res.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
      getItems()
  }, [])

  const handleClick = (e, item) => {
    e.preventDefault()
    push(`/item-list/${item.id}`)
  }

  return (
    <div>
      {items.map(item => (
        <div onClick={e => handleClick(e, item)} key={item.id}>
          <h2>name: {item.item_name}</h2>
          <p>description: {item.item_description}</p>
          <p>price: {item.item_price}</p>
          <p>country: {item.item_country}</p>
          <p>seller: {item.item_seller}</p>
        </div>
      ))}
      <Link to="/protected">
         <button>Create Item</button>
       </Link>
    </div>
  )
}

export default ItemList