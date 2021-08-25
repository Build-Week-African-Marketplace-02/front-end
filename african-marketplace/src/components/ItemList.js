import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ItemList extends React.Component {

constructor() {
  super();
  this.state = {
    items: []
  }
}

  componentDidMount() {
    axios.get('https://african-marketplace-44.herokuapp.com/api/items')
      .then(res => {
        this.setState({
          items: res.data,
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="item-list">
        <Link to="/protected">
        <button>Create Item</button>
      </Link>
        {this.state.items.map((item) => (
          <div className="item-card" key={item.itemSeller}>
            <img className="item-image" src={item.img}/>
           
            <div className="item-details">
              <h2 className="item-name">{item.itemName}</h2>
              <p className="item-location">{item.itemCountry}</p>
              <p>{item.itemDescription}</p>
              <div className="item-bottom-row">
                <p>${item.itemPrice}</p>
              </div>
              <button>
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
