import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css'

const Edit = () => {
    const { id } = useParams();

    const [values, setValues] = useState({
        item_name: "",
        initial_quantity: "",
        used_quantity: "",
        added_quantity: "",
        amount: "",
        percentage_remaining: "",
    });

    useEffect(() => {
        const { initial_quantity, used_quantity, added_quantity } = values;
        if (initial_quantity && used_quantity && added_quantity) {
            const initial = parseFloat(initial_quantity);
            const used = parseFloat(used_quantity);
            const added = parseFloat(added_quantity);
            const remaining = initial - used + added;
            const total = initial + added;
            const percentage = ((remaining / total) * 100).toFixed(2);  // Keeping two decimal points
            setValues(v => ({ ...v, percentage_remaining: percentage }));
        }
    }, [values.initial_quantity, values.used_quantity, values.added_quantity]);


    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:3000/auth/inventory/${id}`)
            .then(result => {
                const { item_name,
                    initial_quantity,
                    used_quantity,
                    added_quantity,
                    amount,
                    percentage_remaining } = result.data.Result[0];
                setValues({
                    item_name,
                    initial_quantity,
                    used_quantity,
                    added_quantity,
                    amount
                });
            })
            .catch(err => console.log(err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/auth/edit3/${id}`, values)
            .then(result => {
                if (result.data.Status) {
                    navigate('/dashboard/supply_management');
                } else {
                    alert(result.data.Error);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center pr'>
            <div className='w-50 rounded p-3 pr1'>
                <form onSubmit={handleSubmit}>
                    <h2>Add Supply Inventory</h2>
                    <div className='mb-2'>
                        <label htmlFor='item_name'>Item Name</label>
                        <input type="text" id="item_name" placeholder='Enter item name' className='form-control'
                            value={values.item_name}
                            onChange={e => setValues({ ...values, item_name: e.target.value })} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='initial_quantity'>Initial Quantity</label>
                        <input type="text" id="initial_quantity" placeholder='Enter initial quantity' className='form-control'
                            value={values.initial_quantity}
                            onChange={e => setValues({ ...values, initial_quantity: e.target.value })} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='used_quantity'>Used Quantity</label>
                        <input type="text" id="used_quantity" placeholder='Enter used quantity' className='form-control'
                            value={values.used_quantity}
                            onChange={e => setValues({ ...values, used_quantity: e.target.value })} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='added_quantity'>Added Quantity</label>
                        <input type="text" id="added_quantity" placeholder='Enter added quantity' className='form-control'
                            value={values.added_quantity}
                            onChange={e => setValues({ ...values, added_quantity: e.target.value })} />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor='amount'>Amount</label>
                        <input type="text" id="amount" placeholder='Enter amount' className='form-control'
                            value={values.amount}
                            onChange={e => setValues({ ...values, amount: e.target.value })} />
                    </div>
                    <div className='mb-2'>
                        <label>Percentage Remaining</label>
                        <input type="text" className='form-control'
                            value={values.percentage_remaining + '%'} readOnly />
                    </div>
                    <button className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
