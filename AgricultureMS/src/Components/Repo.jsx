import 'chart.js/auto';
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import './style.css'

function Repo() {
  const [data, setData] = useState([]);
  const [report, setReport] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/auth/repo/deal')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/auth/repo/transaction2')
      .then(response => response.json())
      .then(report => setReport(report))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/auth/repo/inventory')
      .then(response => response.json())
      .then(inventory => setInventory(inventory))
      .catch(error => console.error(error));
  }, []);


  const downloadChart = (canvas, filename) => {
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  const chartData = {
    labels: data.map(item => item.source),
    datasets: [{
      label: 'Income Head',
      data: data.map(item => item.amount),
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
    }],
  };

  const chartDataEx = {
    labels: report.map(item => item.source),
    datasets: [{
      label: 'Expense Head',
      data: report.map(item => item.amount),
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
    }],
  };

  const chartDataSu = {
    labels: inventory.map(item => item.item_name),
    datasets: [{
      label: 'Supply Inventary',
      data: inventory.map(item => item.percentage_remaining),
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
    }],
  };

  const optionsSu = {
    scales: {
      y: {
        ticks: {
          callback: function (value) {
            return `${value}%`;
          }
        }
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-4">
          <Bar id="chart1" data={chartData} options={{}} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="mt-3"
            onClick={() => downloadChart(document.getElementById('chart1'), 'chart1.png')}
            style={{ cursor: 'pointer' }}
          >
            <path d="M19 5h-4V3H9v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-8 12H7v-2h4zm4-4H7v-2h8zm0-4H7V7h8z" />
          </svg>
        </div>
        <div className="col-md-4">
          <Bar id="chart2" data={chartDataEx} options={{}} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="mt-3"
            onClick={() => downloadChart(document.getElementById('chart2'), 'chart2.png')}
            style={{ cursor: 'pointer' }}
          >
            <path d="M19 5h-4V3H9v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-8 12H7v-2h4zm4-4H7v-2h8zm0-4H7V7h8z" />
          </svg>
        </div>
        <div className="col-md-4">
          <Bar id="chart3" data={chartDataSu} options={optionsSu} />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="mt-3"
            onClick={() => downloadChart(document.getElementById('chart3'), 'chart3.png')}
            style={{ cursor: 'pointer' }}
          >
            <path d="M19 5h-4V3H9v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm-8 12H7v-2h4zm4-4H7v-2h8zm0-4H7V7h8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Repo;