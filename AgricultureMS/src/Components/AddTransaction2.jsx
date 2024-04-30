import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios";

const AddTransaction = () => {
  const [transaction2, setTransaction2] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/auth/transaction2')
      .then(result => {
        if (result.data.Status) {
          setTransaction2(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_ex/' + id)
      .then(result => {
        if (result.data.Status) {
          window.location.reload()
        } else {
          alert(result.data.Error)
        }
      })
  }
  return (
    <div className='d-flex vh-100 big-primary justify-content-center align-items-center cr'>
      <div className='w-50 rounded p-3 cr1'>
        <h3>Transaction List</h3>

        <div className='d-flex justify-content-end'>
          <Link to="/dashboard/make" className='btn btn-success'>Create +</Link>
        </div>
        <div className='mt-3'>
          <table className='table table-dark table-bordered'>
            <thead>
              <tr>

                <th>Type</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {
                transaction2.map(e => (
                  <tr key={e.id}>
                    <td>{e.type}</td>
                    <td>{e.amount}</td>
                    <td>{e.date}</td>
                    <td>{e.time}</td>
                    <td>{e.description}</td>
                    <td>
                      <div className="d-inline">
                        <Link to={`/dashboard/edit2/${e.id}`} className='btn btn-sm btn-info me-2'>
                          <span role="img" aria-label="edit">✎</span> {/* Edit Icon */}
                        </Link>
                        <button className='btn btn-sm btn-danger' onClick={() => handleDelete(e.id)}>
                          <span role="img" aria-label="delete">🗑️</span> {/* Delete Icon */}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction