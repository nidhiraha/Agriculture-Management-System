import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'

const SupplyManagement = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/auth/supply_management')
            .then(result => {
                if (result.data.Status) {
                    setData(result.data.Result);
                } else {
                    alert("result.data.Error");
                }
            })
            .catch(err => console.log(err));
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/auth/delete_su/${id}`)
            .then(res => {
                location.reload();
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 big-primary justify-content-center align-items-center sp'>
            <div className='w-50 rounded p-3 sp1'>
                <h2>Transaction List</h2>
                <div className='d-flex justify-content-end'>
                    <Link to="/dashboard/produce" className='btn btn-success'>Create +</Link>
                </div>
                <table className='table table-dark'>
                    <thead>
                        <tr>

                            <th>Item Name</th>
                            <th>Initial Quantity</th>
                            <th>Used Quantity</th>
                            <th>Added Quantity</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((inventory, index) => (
                            <tr key={index}>
                                <td>{inventory.item_name}</td>
                                <td>{inventory.initial_quantity}</td>
                                <td>{inventory.used_quantity}</td>
                                <td>{inventory.added_quantity}</td>
                                <td>{inventory.amount}</td>
                                <td>
                                    <Link to={`/dashboard/edit3/${inventory.id}`} className='btn btn-sm btn-info me-2'>&#9998;</Link> {/* Edit Icon */}
                                    <button className='btn btn-sm btn-danger' onClick={() => handleDelete(inventory.id)}>&#128465;</button> {/* Delete Icon */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SupplyManagement;
