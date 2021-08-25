import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styled from "styled-components";

const StyledItemCreation = styled.div`
display:flex;
justify-content:center;
align-items:center;
height:100vh;

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
  background-image: linear-gradient(to right, #2BC0E4 0%, #EAECC6 51%, #2BC0E4 100%)
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

const initialFormValues = {
  name: "",
  description: "",
  price: "",
  location: ""
};
export default function ItemCreation(props) {
  const { itemList } = props;
  //state for forms
  const [formValues, setFormValues] = useState(initialFormValues);
  //state for items
  const [items, setItems] = useState([]);

  const { push } = useHistory()

  //name
  //description
  //price
  //DROPDOWN for the location
  //submit button

  //function to post a new item to the item list
  const postNewItem = newItem => {
    //eventual POST request using axios will go here
    setItems([newItem, ...items]);
    setFormValues(initialFormValues);
  };

  //function to detect change in the inputs
  const inputChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };
  const onChange = e => {
    const { name, value } = e.target;
    inputChange(name, value);
  };

  const itemSubmit = () => {
    const newItem = {
      name: formValues.name.trim(),
      description: formValues.description.trim(),
      price: formValues.price.trim(),
      location: formValues.location.trim()
    };
    setFormValues(initialFormValues);
    postNewItem(newItem);
    axios.post('https://african-marketplace-44.herokuapp.com/api/auth/products/create', newItem)
      .then(res => {
        props.newItem(res.data)
        push('/item-list')
      })
      .catch(err => {
        console.log(err)
    })
  };
  const onSubmit = e => {
    e.preventDefault();
    itemSubmit();
  };

  return (
    <StyledItemCreation>
      <form id="item-form" onSubmit={onSubmit}>
        <div id='itemform-div'>
        <h2>Add an Item</h2>
        <div id="form-inputs">
          <div id="item-name">
            <label>
              Name:
              <input
                value={formValues.name}
                onChange={onChange}
                name="name"
                type="text"
              />
            </label>
          </div>
          <div id="item-description">
            <label>
              Description:
              <input
                value={formValues.description}
                onChange={onChange}
                name="description"
                type="text"
              />
            </label>
          </div>
          <div id="item-price">
            <label>
              Price:
              <input
                value={formValues.price}
                onChange={onChange}
                name="price"
                type="text"
              />
            </label>
          </div>
          <div id="market-location">
            <label>
              Market Location:
              <select
                onChange={onChange}
                value={formValues.location}
                name="location"
              >
                <option value="">-- Select Market Location</option>
                <option value="bungoma">Bungoma</option>
                <option value="busia">Busia</option>
                <option value="eldoret">Eldoret</option>
                <option value="embu">Embu</option>
                <option value="garisa">Garisa</option>
                <option value="garissa">Garissa</option>
                <option value="isiolo">Isiolo</option>
                <option value="kajiado">Kajiado</option>
                <option value="kakamega">Kakamega</option>
                <option value="kisii">Kisii</option>
                <option value="kisumu">Kisumu</option>
                <option value="kitale">Kitale</option>
                <option value="kitui">Kitui</option>
                <option value="loitoktok">Loitoktok</option>
                <option value="machakos">Machakos</option>
                <option value="makueni">Makueni</option>
                <option value="malindi">Malindi</option>
                <option value="meru">Meru</option>
                <option value="mombasa">Mombasa</option>
                <option value="nairobi">Nairobi</option>
                <option value="nakuru">Nakuru</option>
                <option value="oloitoktok">Oloitoktok</option>
                <option value="wajir">Wajir</option>
              </select>
            </label>
          </div>
          </div>
          <div className="form-group submit">
            <button id="item-submit">Add Item</button>
          </div>
        </div>
        
      </form>
      {items.map((item, index) => {
        return <Item key={index} details={item} />;
      })}
    </StyledItemCreation>
  );
}

const Item = ({ details }) => {
  if (!details) {
    return <h3>Working fetching your item details...</h3>;
  }
  return (
    <div className="item container">
      <h2>Name: {details.name}</h2>
      <p>Description: {details.description}</p>
      <p>Price: {details.price}</p>
      <p>Location: {details.location}</p>
    </div>
  );
};
