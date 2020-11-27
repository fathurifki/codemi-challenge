/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Box, makeStyles, createStyles } from '@material-ui/core';
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
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';
import Card from '../../components/Card/Card';
import CardBody from '../../components/Card/CardBody';
import numberWithCommas from '../../utils/formatNumber';
import ChartBar from '../../components/Chart/CharBar';
import ChartPie from '../../components/Chart/ChartPie';

const key = 'dashboard';

const useStyles = makeStyles(theme =>
  createStyles({
    container: {},
    labels: {
      fontSize: 14,
      fontWeight: 700,
      color: '#757575',
    },
    subLabel: {
      fontSize: 12,
      marginLeft: 10,
      color: '#757575',
    },
    boxSelect: {
      marginTop: 10,
    },
    cardHeader: {
      backgroundColor: '#F8F8F8',
    },
    cardTitle: {
      fontSize: 14,
      marginLeft: 10,
      color: 'white',
    },
    cardTitleBig: {
      fontSize: 18,
      marginLeft: 10,
      color: '#757575',
    },
  }),
);

export function Dashboard({
  loadApi,
  data,
  loadConfirmedApi,
  confirmedData,
  loadConfirmedRegionApi,
  onChangeInput,
  confirmedRegionData,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const classes = useStyles();
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
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <p
          style={{
            fontSize: 14,
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          {val.countryRegion}
        </p>
        <p
          style={{
            fontSize: 14,
            color: 'white',
            fontWeight: 'bold',
          }}
        >
          {numberWithCommas(val.active)}
        </p>
      </Box>
    ));

  const cardInfo = (color, title, value) => (
    <Box
      style={{
        backgroundColor: color,
        padding: 20,
        borderRadius: 4,
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
        marginBottom: 20,
      }}
    >
      <span
        style={{
          fontSize: 20,
          color: '#FFFFFF',
          marginBottom: 10,
          fontWeight: 'bold',
        }}
      >
        {title}
      </span>
      <span style={{ fontSize: 18, fontWeight: 800 }}>{value}</span>
    </Box>
  );

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <GridContainer>
          <GridItem xs={12} sm={12} md={8}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12}>
                <h3>Global Cases COVID-19</h3>
                <GridContainer
                  style={{ display: 'flex', justifyContent: 'center' }}
                >
                  <GridItem xs={12} sm={3} md={3}>
                    {cardInfo(
                      '#FFA500',
                      'Confirmed',
                      numberWithCommas(data && data.confirmed.value),
                    )}
                  </GridItem>
                  <GridItem xs={12} sm={3} md={3}>
                    {cardInfo(
                      '#32CD32',
                      'Recovered',
                      numberWithCommas(data && data.recovered.value),
                    )}
                  </GridItem>
                  <GridItem xs={12} sm={3} md={3}>
                    {cardInfo(
                      '#DC143C',
                      'Deaths',
                      numberWithCommas(data && data.deaths.value),
                    )}
                  </GridItem>
                </GridContainer>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} style={{ marginTop: 20 }}>
                <Card>
                  <CardBody>
                    <div>
                      <h4 className={classes.cardTitleBig}>
                        World Cases Diagram
                      </h4>
                    </div>
                    <GridItem
                      xs={12}
                      sm={12}
                      md={12}
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <ChartPie
                        codeCountry={codeCountry}
                        totalStats={totalStats}
                      />
                    </GridItem>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <h3>Indonesia Cases COVID-19</h3>
                <Card>
                  <CardBody>
                    <div>
                      <h4 className={classes.cardTitleBig}>
                        Indonesia Cases Data
                      </h4>
                    </div>
                    <GridContainer
                      style={{
                        margin: 10,
                      }}
                    >
                      <GridItem
                        xs={12}
                        sm={12}
                        md={12}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <ReactFlagsSelect
                          searchable
                          searchPlaceholder="Search for a country"
                          defaultCountry="ID"
                          onSelect={val => handleInput(val)}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                      }}
                    >
                      <GridItem xs={12} sm={3} md={3}>
                        {cardInfo(
                          '#FFA500',
                          'Confirmed',
                          numberWithCommas(
                            confirmedRegionData &&
                              confirmedRegionData.confirmed.value,
                          ),
                        )}
                      </GridItem>
                      <GridItem xs={12} sm={3} md={3}>
                        {cardInfo(
                          '#32CD32',
                          'Recovered',
                          numberWithCommas(
                            confirmedRegionData &&
                              confirmedRegionData.recovered.value,
                          ),
                        )}
                      </GridItem>
                      <GridItem xs={12} sm={3} md={3}>
                        {cardInfo(
                          '#DC143C',
                          'Death',
                          numberWithCommas(
                            confirmedRegionData &&
                              confirmedRegionData.deaths.value,
                          ),
                        )}
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </GridItem>
          <GridItem xs={12} sm={12} md={3}>
            <Card style={{ backgroundColor: 'rgba(73,155,234,1)' }}>
              <CardBody>
                <div>
                  <h4 className={classes.cardTitle}>
                    Most Country COVID-19 Cases
                  </h4>
                </div>
                <p style={{ marginLeft: 12, fontSize: 25, color: 'white' }}>
                  {confirmedData && confirmedData[0].countryRegion}
                </p>
                <div>
                  <h4 className={classes.cardTitle}>Graph Bar</h4>
                  <hr style={{ marginLeft: 10, marginRight: 10 }} />
                </div>
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ChartBar
                    compiledResult={compiledResult}
                    categoriesData={codeCountry}
                  />
                </GridItem>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <h4 style={{ color: 'white' }}>Country</h4>
                  <h4 style={{ color: 'white' }}>Count</h4>
                </div>
                <hr style={{ marginLeft: 10, marginRight: 10 }} />
                <GridItem xs={12} sm={12} md={12}>
                  <div>{renderComponent}</div>
                </GridItem>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </GridItem>
    </GridContainer>
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

Dashboard.propTypes = {
  loadApi: PropTypes.func,
  data: PropTypes.object,
  loadConfirmedApi: PropTypes.func,
  loadConfirmedRegionApi: PropTypes.func,
  confirmedData: PropTypes.array,
  onChangeInput: PropTypes.func,
  confirmedRegionData: PropTypes.array,
};

export default compose(
  withConnect,
  memo,
)(Dashboard);
