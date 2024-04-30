import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'



const AddExpense = () => {
  const [expense, setExpense] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/auth/add_expense', { expense })
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/expense')
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 inc'>
      <div className='p-3 rounded w-25 border inc2'>
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="expense"><strong>Expense:</strong></label>
            <input type="text" name='expense' placeholder='Enter Expense' onChange={(e) => setExpense(e.target.value)}
              className='form-control rounded-0' />
          </div>

          <button className='btn btn-success w-100 rounded-0 mb-2'>Add Expense</button>

        </form>
      </div>
    </div>
  )
}

export default AddExpense