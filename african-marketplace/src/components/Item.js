import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import axios from 'axios';

const Item = (props) => {

const [item, setItem] = useState({})
const { id } = props.match.params

useEffect(() => {
    axios.get(`https://african-marketplace-44.herokuapp.com/api/items/${id}`)
        .then(res => {
            setItem(res.data)
        })
        .catch(err => {
            console.log(err)
        })
},[])

return(
    <div>
        <h2>{item.item_name}</h2>
        <p>{item.item_description}</p>
        <p>{item.item_price}</p>
        <p>{item.item_seller}</p>
        <p>{item.item_country}</p>
    </div>
)
}
export default Item;