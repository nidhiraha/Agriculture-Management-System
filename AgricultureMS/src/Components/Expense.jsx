import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';

const Expense = () => {
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/expense')
      .then(result => {
        if (result.data.Status) {
          setExpense(result.data.Result);
        } else {
          alert("result.data.Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='px-5 mt-3 vh-100 inc'>
      <div className='d-flex justify-content-center w-50 inc2'>
        <h3>Expense List</h3>
      </div>

      <Link to="/dashboard/add_expense" className='btn btn-success'>
        <span>&#x2B;</span> Add
      </Link>
      <div className='mt-3'>
        <table className='table table-dark'>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {expense.map(d => (
              <tr key={d.id}>
                <td>{d.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Expense;
