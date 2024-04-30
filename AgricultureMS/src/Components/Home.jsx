import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style.css';

const Home = () => {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);


  useEffect(() => {
    incomeCount();
    expenseCount();
  }, []);

  const incomeCount = () => {
    axios.get('http://localhost:3000/auth/income_count')
      .then(result => {
        if (result.data.Status) {
          setIncomeTotal(result.data.Result[0].deal);
        } else {
          alert(result.data.Error);
        }
      })
  }

  const expenseCount = () => {
    axios.get('http://localhost:3000/auth/expense_count')
      .then(result => {
        if (result.data.Status) {
          setExpenseTotal(result.data.Result[0].transaction2);
        } else {
          alert(result.data.Error);
        }
      })
  }

  return (
    <div className="home-container">
      <div className='p-3 d-flex justify-content-around mt-3'>
        <div className='balance-box px-3 pt-2 pb-3  border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Balance</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>${incomeTotal - expenseTotal}</h5>
          </div>
        </div>
        <div className='income-box px-3 pt-2 pb-3  border shadow-sm  w-25'>
          <div className='text-center pb-1'>
            <h4>Income</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>${incomeTotal}</h5>
          </div>
        </div>
        <div className='expense-box px-3 pt-2 pb-3 border shadow-sm w-25'>
          <div className='text-center pb-1'>
            <h4>Expense</h4>
          </div>
          <hr />
          <div className='d-flex justify-content-between'>
            <h5>Total:</h5>
            <h5>${expenseTotal}</h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;
