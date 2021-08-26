import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

const StyledItemCreation = styled.div`
display:flex;
justify-content:center;
align-items:center;
height:80vh;

#form-container {
  padding:5rem;
  height:50vh;
  box-shadow:5px 10px 8px 10px #888888;
}

button{
  display:flex;
  justify-content:center;
  border-radius:25px;
  font-family: "Arial Black", Gadget, sans-serif;
  text-transform: uppercase;
  cursor: pointer;
  transition: 0.5s;
  width:35%;
  background-size: 200% auto;
  color: #FFF;
  box-shadow: 0 0 20px #eee;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.3s cubic-bezier(.25,.8,.25,1);
}

  
button:hover{
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  margin: 8px 10px 12px;
  background-position: right center;
}

#item-submit {
  padding:3%;
  margin-top:15%;
  margin-left:32.5%;
  background-image: linear-gradient(to right, #DD5E89 0%, #F7BB97 51%, #DD5E89 100%)
}

#itemform-div {
  padding:5rem;
  height:50vh;
  box-shadow:5px 10px 8px 10px #888888;
}

#form-inputs {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input, textarea:focus {
  border: 5px solid #555;
}
  
input, textarea{
  display: block;
  padding: .5rem .8rem .5rem .8rem;
  margin: 5% 0;
  border-radius: 5px;
  font-size: 20px;
  border: solid grey 2px;
}
  
textarea{
  height: 15vh;
}
`

export default function ItemCreation(props) {
 
  const { push } = useHistory()

  const [item, setItem] = useState({
    item_name: '',
    item_description: '',
    item_price: '',
    item_country: '',
    username: '',
  })

  const handleChange = e => {
    setItem({
        ...item,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
        push('/item-list')
        const newItem = {
            id: Date.now(),
            item_name: item.item_name,
            item_description: item.item_description,
            item_price: item.item_price,
            item_country: item.item_country,
            username: item.username,
        }

        axios.post(`https://african-marketplace-44.herokuapp.com/api/items/`, newItem)
            .then(res => {
                props.newItem(res.data)
            })
            .catch(err => {
                console.log(err)
            })
  }

  return (
    <StyledItemCreation>

      <div id='form-container'>
      <form onSubmit={handleSubmit}>
        <h2>Add Item</h2>
					<div className="form-group">
						<input value={item.item_name} onChange={handleChange} name="item_name" type="text" placeholder='item name'/>
					</div>
					<div className="form-group">
						<input value={item.item_description} onChange={handleChange} name="item_description" type="text" placeholder='description'/>
					</div>
					<div className="form-group">
						<input value={item.item_price} onChange={handleChange} name="item_price" type="text" placeholder='price'/>
					</div>
          <div className="form-group">
						<input value={item.username} onChange={handleChange} name="username" type="text" placeholder='seller name'/>
					</div>
					<div className="form-group">
						<select value={item.item_country} onChange={handleChange} name="item_country" type="text" placeholder='country'>
            <option value="">--Select Market Location--</option>
            <option value="KEN">KEN</option>
            <option value="SSD">SSD</option>
            <option value="UGA">UGA</option>
            <option value="DRC">DRC</option>
            <option value="TZA">TZA</option>
            <option value="RWA">RWA</option>
            </select>
					</div>		
          <div className="form-group submit">
            <button id="item-submit">Add Item</button>
          </div>
			</form>
      </div>
    </StyledItemCreation>
  );
}
