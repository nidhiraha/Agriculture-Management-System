import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AddIncome = () => {
  const [income, setIncome] = useState()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/auth/add_income', { income })
      .then(result => {
        if (result.data.Status) {
          -
          navigate('/dashboard/income')
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err))
  }
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 inc'>
      <div className='p-3 rounded w-25 border inc2'>
        <h2>Add Income</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="income"><strong>Income:</strong></label>
            <input type="text" name='income' placeholder='Enter Income' onChange={(e) => setIncome(e.target.value)}
              className='form-control rounded-0' />
          </div>

          <button className='btn btn-success w-100 rounded-0 mb-2'>Add Income</button>

        </form>
      </div>
    </div>
  )
}

export default AddIncome

