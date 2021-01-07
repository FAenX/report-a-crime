import React, { useState } from "react";
import ReactDOM from "react-dom";

import  {Line, Bar, Doughnut}  from "react-chartjs-2";

import regeneratorRuntime from  'regenerator-runtime/runtime'
regeneratorRuntime



export default function Report() {
  const data1 = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: '# Assault',
        data: [12, 19, 3, 5, 2, 3],
        fill: true,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
        yAxisID: 'y-axis-1',
      },
      {
        label: '# Roberies',
        data: [1, 2, 10, 15, 2, 2],
        fill: true,
        backgroundColor: '#ff9999',
        borderColor: 'rgba(54, 162, 150, 0.2)',
        yAxisID: 'y-axis-2',
      },
      {
        label: '# Buglaries',
        data: [1, 2, 13, 5, 12, 2],
        fill: true,
        backgroundColor: '#99ccff',
        borderColor: 'rgba(54, 162, 180, 0.2)',
        yAxisID: 'y-axis-3',
      },
    ],
  }
  
  const options1 = {
    scales: {
      yAxes: [
        {
          type: 'linear',
          display: true,
          position: 'left',
          id: 'y-axis-1',
        },
        {
          type: 'linear',
          display: false,
          position: 'right',
          id: 'y-axis-2',
          
        },
        {
          type: 'linear',
          display: false,
          position: 'right',
          id: 'y-axis-3',
        },
      ],
    },
  }

  const data2 = {
      labels: ['abc', '2', '3', '4', '5', '6'],
      datasets: [
        {
          label: '# total crime reports',
          data: [12, 19, 13, 15, 12, 3],
          fill: true,
          backgroundColor: '#99ccff',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    }

    const bar = {
      labels: ['asault', 'robberies', 'murder'],
      datasets: [
        {
          label: '# total crime reports',
          data: [12, 19, 13],
          fill: true,
          backgroundColor: '#99ccff',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
      ],
    }
  

  let dough  = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',
          'rgba(54, 162, 235, 0.8)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }

  
  return (
    <div className='container is-flex is-flex-direction-row is-justify-content-center is-align-content-center is-flex-wrap-wrap p-4'>
     
        <div className="graph"><Line data={data2} options={options} /></div>
     
     
        <div className="graph"><Doughnut data={dough} /></div>
     
      
        <div className="graph"><Bar data={bar} options={options} /></div>
     
      
        <div className="graph"><Line data={data1} options={options1} /></div>
   
    </div>
  );
}

const rootElement = document.getElementById("reports");
ReactDOM.render(<Report />, rootElement);
