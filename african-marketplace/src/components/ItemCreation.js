import React, { useState } from "react";

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
  };
  const onSubmit = e => {
    e.preventDefault();
    itemSubmit();
  };

  return (
    <div>
      <form id="item-form" onSubmit={onSubmit}>
        <h2>Add an Item</h2>
        <div className="form-group inputs">
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
          <div className="form-group submit">
            <button id="item-submit">Add Item</button>
          </div>
        </div>
      </form>
      {items.map((item, index) => {
        return <Item key={index} details={item} />;
      })}
    </div>
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
