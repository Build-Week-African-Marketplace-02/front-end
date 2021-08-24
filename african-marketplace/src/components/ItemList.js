import React, { useState, useEffect} from 'react'
import axios from 'axios';
import Item from './Item'

const ItemList = () => {
    const [items, setItems] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/items')
          .then(res => {
            setItems(res.data);
          })
          .catch(err => {
            console.log(err);
          });
      }, []);

    return (
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
                {
                    items.map(item=><Item key={item.id} item={item}/>)
                }
            </tbody>
        </table>
    )
}

export default ItemList
