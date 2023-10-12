import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart(prop) {
  const { excelData } = prop;
  
  let quantity0 = excelData.filter((row) => row.status === 0).length;
  let quantity1 = excelData.filter((row) => row.status === 1).length;
  let quantity2 = excelData.filter((row) => row.status === 2).length;
  let percent0 = Math.ceil((quantity0 / excelData.length) * 100)
  let percent1 = Math.ceil((quantity1 / excelData.length) * 100)
  let percent2 = Math.ceil((quantity2 / excelData.length) * 100)

  const data = {
    labels: [`Status:0 (${percent0}%)`, `Status:1 (${percent1}%)`, `Status:2 (${percent2}%)`],
    datasets: [
      {
        label: ': statusun sayı',
        data: [quantity0, quantity1, quantity2],
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
      <Pie
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
export default PieChart;