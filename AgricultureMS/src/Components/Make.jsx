import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Make = () => {
  const [transaction2, setTransaction2] = useState({
    source: "",
    amount: "",
    date: "",
    time: "",
    description: "",
    type: "",
  });

  const [expense, setExpense] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/auth/expense")
      .then(result => {
        if (result.data.Status) {
          setExpense(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!transaction2.source || !transaction2.amount || !transaction2.date || !transaction2.time || !transaction2.description || !transaction2.type) {
      alert('All fields are required!');
      return;
    }
    axios.post('http://localhost:3000/auth/make', transaction2)
      .then(result => {
        if (result.data.Status) {
          navigate('/dashboard/add_transaction2')
        } else {
          alert(result.data.Error)
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center cr'>
      <div className='p-3 rounded w-50 cr1'>
        <h3 className="text-center">Add Transaction</h3>
        <form onSubmit={handleSubmit}>
          <div className='mb-2'>
            <label htmlFor="source" className='form-label'>Source</label>
            <select name="source" id="source" className='form-select' value={transaction2.source}
              onChange={(e) => setTransaction2({ ...transaction2, source: e.target.value })}>
              <option value="">Select Source</option>
              {expense.map((c) => (
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
              value={transaction2.type}
              onChange={(e) => setTransaction2({ ...transaction2, type: e.target.value })}
            >
              <option value="">Select Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
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
              value={transaction2.amount}
              onChange={(e) => setTransaction2({ ...transaction2, amount: e.target.value })}
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
              value={transaction2.date}
              onChange={(e) => setTransaction2({ ...transaction2, date: e.target.value })}
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
              value={transaction2.time}
              onChange={(e) => setTransaction2({ ...transaction2, time: e.target.value })}
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
              value={transaction2.description}
              onChange={(e) => setTransaction2({ ...transaction2, description: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <button type="submit" className='btn btn-primary w-100'>Add Transaction</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Make;



