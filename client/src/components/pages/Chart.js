import React from 'react';
import {Line} from 'react-chartjs-2';

const Chart = ({ monthSaleArr, color, label }) => {
  const data = {
    labels: [ 1500, 2000, 2500, 3000 ],
    datasets: [
      {
        label: label,
        data: monthSaleArr,
        fill: true,
        borderColor: color //"rgba(75,192,192,1)"
      },
    ]
  };

  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 12
    }
  };
  
  const options = {
    responsive: true,
    title: {
      display: false,
      text: "Chart Title"
    },
    scales: {
      // xAxes: [
      //   {
      //     ticks: {
      //       suggestedMin: 0,
      //       suggestedMax: 30
      //     }
      //   }
      // ],
      yAxes: [
        {
          ticks: {
            suggestedMin: 1500,
            suggestedMax: 300000
          }
        }
      ],
    }
  };
  
  return (
    <div>
      <Line data={data} height={300} width={250} legend={legend} options={options} />
    </div>
  );
  
}

export default Chart;