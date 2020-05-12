import React from 'react';
import {Line} from 'react-chartjs-2';

const Chart = ({ monthSaleArr }) => {
  const data = {
    
    datasets: [
      {
        data: monthSaleArr,
        fill: true,
        borderColor: "rgba(75,192,192,1)"
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
    title: {
      display: false,
      text: "Chart Title"
    },
    
  };
  

  
  return (
    <div>
      <Line data={data} height={300} width={250} legend={legend} options={options} />
    </div>
  );
  
}

export default Chart;