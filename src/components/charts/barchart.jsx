import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function BarChart(prop) {
  const { excelData } = prop;
  let sum0 = 0;
  let sum1 = 0;
  let sum2 = 0;

  const quantity0 = excelData.filter((row) => row.status === 0);
  const quantity1 = excelData.filter((row) => row.status === 1);
  const quantity2 = excelData.filter((row) => row.status === 2);

  quantity0.forEach(row => {
    sum0 += row.len;
  })
  quantity1.forEach(row => {
    sum1 += row.len;
  })
  quantity2.forEach(row => {
    sum2 += row.len;
  })
  const data = {
    labels: [0, 1, 2],
    datasets: [
      {
        label: "len'lərin cəmi",
        data: [sum0, sum1, sum2],
        backgroundColor: [
          'rgba(62, 253, 135, .6)',
          'rgba(62, 208, 253, .6)',
          'rgba(225, 253, 62, .6)'
        ],
        borderColor: [
          'rgba(37, 146, 79, .8)',
          'rgba(49, 158, 190, .8)',
          'rgba(178, 201, 51, .8)'
        ],
        borderWidth: 1,

      },
    ],
  };
  return (
    <>
      <Bar
        width={80}
        height={50}
        data={data}
        options={{
          responsive: true,
        }}
      />

    </>
  );
};
export default BarChart;
