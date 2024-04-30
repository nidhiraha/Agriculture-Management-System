import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'

const Transaction = (props) => {
  const navigate = useNavigate();
  return (
    <div className="d-flex justify-content-center vh-100 inc">
      <div>
        <h1 className='me-2'> Transaction Type</h1>

        <button onClick={() => { navigate('/dashboard/add_transaction', { replace: true }) }} className='btn btn-success w-100 rounded-0 mb-2'>Income</button>
        <button onClick={() => { navigate('/dashboard/add_transaction2', { replace: true }) }} className='btn btn-success w-100 rounded-0 mb-2'>Expense</button>
      </div>
    </div>
  )
}

export default Transaction
