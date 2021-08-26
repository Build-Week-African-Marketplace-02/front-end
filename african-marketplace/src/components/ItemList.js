import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import styled from 'styled-components';

const StyledItemList= styled.div`
height: 100%;
padding: .2rem 1rem;
box-shadow:5px 10px 8px 10px #888888;

header {
  background-image:url('https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80');
  background-repeat: no-repeat;
  background-size: cover;
  height: 30%;
}

h1 {
  padding-top: 3rem;
  font-size: 2em;
  color: #fff;
  text-shadow:
    -1.5px -1.5px 0 #000,  
    1.5px -1.5px 0 #000,
    -1.5px 1.5px 0 #000,
    1.5px 1.5px 0 #000;
}

header p {
  width: 80%;
  margin: 0 auto;
  background-color: rgba(255,255,255,.65);
  padding: 1rem;
  color: #000;
  font-weight: bold;
}

button{
  padding: 5px;
  margin: 20px 0;
  border-radius:5px;
  background-color:#f4c5be;
  color: #6ba393;
  font-size: 1em;
  }

button:hover {
  background-color: #6ba393;
  color: #f4c5be;
  }

#items-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: stretch;
  height: 70%;
  margin-top: 20px;
}

.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f4c5be;
  height: 40%;
  padding: 0 10px;
  margin: 10px 5px;
}

.item h3 {
  color: #6ba393;
  font-weight: bold;
}

`

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
    <StyledItemList>
      <header>
        <h1>Market Items</h1>
        <p>Listed below are all of the items for sale in the market. To add your item to this list, click the button below.</p>
        <Link to="/protected">
         <button>Create Item</button>
       </Link>
      </header>
      
      <div id='items-container'>
        {items.map(item => (
          <div className='item' onClick={e => handleClick(e, item)} key={item.id}>
            <h3>{item.item_name}</h3>
            <p>Description: {item.item_description}</p>
            <p>Price: ${item.item_price}</p>
            <p>Country: {item.item_country}</p>
            <p>Seller: {item.username}</p>
          </div>
        ))}
      </div>
      
    </StyledItemList>
  )
}

export default ItemList