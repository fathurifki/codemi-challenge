import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import numberWithCommas from '../../../utils/formatNumber';

const ChartPie = ({ codeCountry, totalStats }) => {
  const state = {
    options: {
      chart: {
        type: 'pie',
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: codeCountry,
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
      labels: Object.keys(totalStats),
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: true,
          left: 2,
          top: 2,
          opacity: 0.5,
        },
      },
    },
    series: Object.values(totalStats),
  };

  return (
    <React.Fragment>
      <Chart
        options={state.options}
        series={state.series}
        type="pie"
        width="500"
      />
    </React.Fragment>
  );
};

ChartPie.propTypes = {
  codeCountry: PropTypes.array,
  totalStats: PropTypes.array,
};

export default ChartPie;
