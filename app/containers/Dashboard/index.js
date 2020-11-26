import React, { memo } from 'react';
import Chart from 'react-apexcharts';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactFlagsSelect from 'react-flags-select';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {
  loadApi,
  loadConfirmedApi,
  loadConfirmedRegionApi,
  setInput,
} from './actions';
import {
  getDataApi,
  getDataConfirmedApi,
  getInput,
  getDataConfirmedRegionApi,
} from './selector';
import 'react-flags-select/css/react-flags-select.css';

const key = 'dashboard';

export function Dashboard({
  loadApi,
  data,
  loadConfirmedApi,
  confirmedData,
  loadConfirmedRegionApi,
  onChangeInput,
  inputData,
  confirmedRegionData,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  React.useEffect(() => {
    loadApi();
    loadConfirmedApi();
    loadConfirmedRegionApi();
  }, []);

  const compiledResult =
    confirmedData && confirmedData.map(val => val.confirmed);
  const codeCountry = confirmedData && confirmedData.map(val => val.iso2);

  const handleInput = val => {
    onChangeInput(val);
    loadConfirmedRegionApi();
  };

  const totalStats = {
    Confirmed: data && data.confirmed.value,
    Recovered: data && data.recovered.value,
    Deaths: data && data.deaths.value,
  };

  const renderComponent =
    confirmedData &&
    confirmedData.map((val, i) => (
      <>
        <p>{i + 1}</p>
        <p>{val.countryRegion}</p>
        <p>{val.active}</p>
      </>
    ));

  const optionline = {
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

  const option = {
    options: {
      chart: {
        type: 'bar',
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
        },
      },
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
    series: [
      {
        name: 'Confirmed',
        data: compiledResult,
      },
    ],
  };

  return (
    <div>
      <div>Dashboard</div>
      <div>
        <h2>World Stat</h2>
        <p>Confirmed</p>
        <p>{data && data.confirmed.value}</p>
        <p>Death</p>
        <p>{data && data.recovered.value}</p>
        <p>Recoverd</p>
        <p>{data && data.deaths.value}</p>
      </div>
      <div>
        <Chart
          options={optionline.options}
          series={optionline.series}
          type="pie"
          width="500"
        />
      </div>
      <div>
        <p>Most World Infected</p>
        <p>{confirmedData && confirmedData[0].countryRegion}</p>
        <p>Chart</p>
        <Chart
          options={option.options}
          series={option.series}
          type="bar"
          width="500"
        />
        <p>Rank</p>
        <div>{renderComponent}</div>
      </div>
      <div>
        <ReactFlagsSelect
          searchable
          searchPlaceholder="Search for a country"
          defaultCountry="ID"
          onSelect={val => handleInput(val)}
        />
        <p>{inputData}</p>
        <p>Confirmed</p>
        <p>{confirmedRegionData && confirmedRegionData.confirmed.value}</p>
        <p>Death</p>
        <p>{confirmedRegionData && confirmedRegionData.recovered.value}</p>
        <p>Recoverd</p>
        <p>{confirmedRegionData && confirmedRegionData.deaths.value}</p>
      </div>
    </div>
  );
}

const mapStateProps = createStructuredSelector({
  data: getDataApi(),
  confirmedData: getDataConfirmedApi(),
  inputData: getInput(),
  confirmedRegionData: getDataConfirmedRegionApi(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loadApi: () => {
      dispatch(loadApi());
    },
    loadConfirmedApi: () => {
      dispatch(loadConfirmedApi());
    },
    loadConfirmedRegionApi: () => {
      dispatch(loadConfirmedRegionApi());
    },
    onChangeInput: evt => dispatch(setInput(evt)),
  };
}

const withConnect = connect(
  mapStateProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Dashboard);
