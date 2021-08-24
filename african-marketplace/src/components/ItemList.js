import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Item from "./Item";
import ItemCreation from "./ItemCreation";

const ItemList = () => {
  const [items, setItems] = useState([]);

<<<<<<< HEAD
    useEffect(()=>{
        axios.get('https://african-marketplace-44.herokuapp.com/products')
          .then(res => {
            setItems(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }, []);
=======
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/items")
      .then(res => {
        setItems(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
>>>>>>> beb4ff215ad089e8b1fc7c4916ac6f4aeaaca645

  return (
    <>
      <Link to="/createitem">
        <button>Create Item</button>
      </Link>
      <table>
        <thread>
          <tr>
            <th>name</th>
            <th>descripton</th>
            <th>location</th>
            <th>seller</th>
            <th>price</th>
          </tr>
        </thread>
        <tbody>
          {items.map(item => (
            <Item key={item.id} item={item} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ItemList;
