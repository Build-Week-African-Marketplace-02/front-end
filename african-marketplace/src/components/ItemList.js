import React from 'react'
import Item from './Item'

const ItemList = () => {
    const { items } = props

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
                    items.map(item=><Items key={item.id} item={item}/>)
                }
            </tbody>
        </table>
    )
}

export default ItemList
