import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from "axios";


const AddTransaction = () => {
  const [deal, setDeal] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:3000/auth/deal')
      .then(result => {
        if (result.data.Status) {
          setDeal(result.data.Result);
        } else {
          alert(result.data.Error)
        }
      }).catch(err => console.log(err));
  }, [])

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete/' + id)
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
          <Link to="/dashboard/create" className='btn btn-success'>Create +</Link>
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
                deal.map(e => (
                  <tr key={e.id}>
                    <td>{e.type}</td>
                    <td>{e.amount}</td>
                    <td>{e.date}</td>
                    <td>{e.time}</td>
                    <td>{e.description}</td>
                    <td>
                      <div className="d-inline">
                        <Link to={`/dashboard/edit/${e.id}`} className='btn btn-sm btn-info me-2'>
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
}

export default AddTransaction