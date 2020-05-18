import React from 'react';
import {Line} from 'react-chartjs-2';
import "chartjs-plugin-labels";

const PercentageChart = ({ delayedShipments, perce, color, label }) => {
  const data = {
    labels: [0, delayedShipments.length, delayedShipments.length + 1, delayedShipments.length + 2 ],
    datasets: [
      {
        label: label,
        data: [ 0, perce ],
        fill: true,
        borderColor: color
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
    plugins: {
      labels: {
        // render 'label', 'value', 'percentage', 'image' or custom function, default is 'percentage'
        render: 'percentage',
        precision: 2,
        // show the real calculated percentages from the values and don't apply the additional logic to fit the percentages to 100 in total, default is false
        showActualPercentages: true,

       
      }
    },
    title: {
      display: false,
      text: "Chart Title"
    },
    scales: {
      xAxes: [
        {
          ticks: {
            suggestedMin: 0,
            suggestedMax: 30
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            suggestedMin: "0",
            suggestedMax: "100"
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

export default PercentageChart;