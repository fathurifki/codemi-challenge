import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import numberWithCommas from '../../../utils/formatNumber';

const ChartBar = ({ categoriesData, compiledResult }) => {
  const state = {
    options: {
      chart: {
        type: 'bar',
        toolbar: {
          show: false,
        },
      },
      colors: ['#FFFFFF'],
      xaxis: {
        categories: categoriesData,
        position: 'top',
        axisBorder: {
          show: false,
        },
        labels: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        axisTicks: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          dataLabels: {
            enabled: false,
            position: 'bottom',
          },
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter(value) {
            return numberWithCommas(value);
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
    },
    series: [
      {
        name: 'Confirmed',
        data: compiledResult,
      },
    ],
  };

  return (
    <React.Fragment>
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        width="350"
      />
    </React.Fragment>
  );
};

ChartBar.propTypes = {
  categoriesData: PropTypes.array,
  compiledResult: PropTypes.array,
};

export default ChartBar;
