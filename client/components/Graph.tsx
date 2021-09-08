import { NextPage } from 'next';
import React from 'react';
import { Bar } from 'react-chartjs-2';

interface GraphProps {
  prediction: Array<{}>;
}

export const Graph: NextPage<GraphProps> = ({ prediction }): JSX.Element => {
  const labels = prediction.map((prd) =>
    Object.keys(prd).toString().replaceAll('_', ' ').toLowerCase()
  );
  const values = prediction.map((prd) => Object.values(prd));

  const data = {
    labels,
    datasets: [
      {
        label: 'Prediction probability',
        data: values,
        backgroundColor: prediction.map(() => {
          return 'rgba(255, 255, 255, 0.9)';
        }),
        borderColor: prediction.map(() => {
          return 'rgba(0, 0, 0, 1)';
        }),
      },
    ],
    borderWidth: 1,
  };

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
  };

  return (
    <React.Fragment>
      <Bar data={data} options={options} />
    </React.Fragment>
  );
};
