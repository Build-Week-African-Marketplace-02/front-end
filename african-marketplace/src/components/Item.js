import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import axios from 'axios';

const Item = (props) => {

    const [item, setItem] = useState('');

    const { id } = useParams();
    const { push } = useHistory();

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/item/${id}`)
            .then(res=>{
                setItem(res.data);
            })
            .catch(err=>{
                console.log(err.response);
            })
    }, [id]);

    // const handleDeleteItem = () => {
    //     axios.delete(`http://localhost:5000/api/item/${id}`)
    //         .then(res => {
    //             setItem(res.data)
    //             push('/item')
    //         })
    //         .catch(err => {
    //             console.log(err)
    //         })
    // }

    return(<div className="modal-page col">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">						
                </div>
                <div className="modal-body">
                    <div className="flexContainer">

                        <section className="item-details">
                            <div>
                                <label>Name: <strong>{item.name}</strong></label>
                            </div>
                            <div>
                                <label>Description: <strong>{item.description}</strong></label>
                            </div>
                            <div>
                                <label>Location: <strong>{item.location}</strong></label>
                            </div>
                            <div>
                                <label>Seller: <strong>{item.seller}</strong></label>
                            </div>
                            <div>
                                <label>Price:</label>
                                <p><strong>{item.price}</strong></p>
                            </div>
                        </section>
                        
                        {/* <section>
                            <Link to={`/item/edit/${item.id}`} className="m-2 btn btn-success">Edit</Link>
                            <span className="delete"><input type="button" className="m-2 btn btn-danger" value="Delete" onClick={handleDeleteItem}/></span>
                        </section> */}
                    </div>
                </div>
            </div>
        </div>
    </div>);
}

export default Item;