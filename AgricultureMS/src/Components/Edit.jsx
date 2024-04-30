import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const Edit = () => {
  const { id } = useParams()
  const [deal, setDeal] = useState({
    source: "",
    type: "",
    amount: "",
    date: "",
    time: "",
    description: "",

  });

  const [income, setIncome] = useState([]);
  const navigate = useNavigate()
  useEffect(() => {
    axios.get("http://localhost:3000/auth/income")
      .then(result => {
        if (result.data.Status) {
          setIncome(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));

    axios.get('http://localhost:3000/auth/deal/' + id)
      .then(result => {
        setDeal({
          ...deal,
          source: result.data.Result[0].source,
          type: result.data.Result[0].type,
          amount: result.data.Result[0].amount,
          date: result.data.Result[0].date,
          time: result.data.Result[0].time,
          description: result.data.Result[0].description,
        })
      }).catch(err => console.log(err))
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3000/auth/edit/' + id, deal)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/add_transaction')
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err))
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center cr'>
      <div className='p-3 rounded w-50 cr1'>
        <h3 className="text-center">Edit Transaction</h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor="source" className='form-label'>
              Source
            </label>
            <select
              name="source"
              id="source"
              className='form-select'
              value={deal.source}
              onChange={(e) => setDeal({ ...deal, source: e.target.value })}>
              <option value="">Select Source</option>
              {income.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className='mb-2'>
            <label htmlFor="type" className='form-label'>
              Type
            </label>
            <select
              name="type"
              id="type"
              className='form-select'
              value={deal.type}
              onChange={(e) => setDeal({ ...deal, type: e.target.value })}>
              <option value="">Select Type</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className='mb-2'>
            <label htmlFor="inputAmount" className='form-label'>
              Amount
            </label>
            <input
              type="text"
              className='form-control rounded-0'
              id="inputAmount"
              placeholder='Enter Amount'
              value={deal.amount}
              onChange={(e) => setDeal({ ...deal, amount: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="inputDate" className='form-label'>
              Date
            </label>
            <input
              type="text"
              className='form-control rounded-0'
              id="inputDate"
              placeholder='Enter Date'
              value={deal.date}
              onChange={(e) => setDeal({ ...deal, date: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="inputTime" className='form-label'>
              Time
            </label>
            <input
              type="text"
              className='form-control rounded-0'
              id="inputTime"
              placeholder='Enter Time'
              value={deal.time}
              onChange={(e) => setDeal({ ...deal, time: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor="inputDescription" className='form-label'>
              Description
            </label>
            <textarea
              type="text"
              className='form-control rounded-0'
              id="inputDescription"
              placeholder='Enter Description'
              value={deal.description}
              onChange={(e) => setDeal({ ...deal, description: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <button type="submit" className='btn btn-primary w-100'>Edit Transaction</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit