import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Income = () => {
  const [income, setIncome] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/auth/income')
      .then(result => {
        if (result.data.Status) {
          setIncome(result.data.Result);
        } else {
          alert("result.data.Error");
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className='px-5 mt-3 vh-100 inc'>
      <div className='d-flex justify-content-center inc2 w-50 '>
        <h3>Income List</h3>
      </div>

      <Link to="/dashboard/add_income" className='btn btn-success'>
        <span>&#x2B;</span>Add
      </Link>
      <div className='mt-3'>
        <table className='table table-dark'>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {income.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Income;
