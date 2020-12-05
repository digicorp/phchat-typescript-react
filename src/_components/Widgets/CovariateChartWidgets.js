import React from 'react'
import Chart from 'react-google-charts'
import { Col, CardHeader, CardTitle, Spinner } from 'reactstrap'

class CovariateChartWidgets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { md, covariateShiftData = [] } = this.props
    let finalCovariateShiftChart = []
    const {
      distanceMetric = '',
      SignificanceLevel = '',
      SignificanceMinSupport = '',
      dataList = []
    } = covariateShiftData

    if (Array.isArray(dataList) && dataList.length > 0) {
      dataList.map((values) => {
        // console.log('values.feature :>> ', values.feature)
        // console.log('values :>> ', values)

        let timeLineData = []
        let hticks = []
        for (let [key, value] of values.timeline.entries()) {
          key = key + 1
          hticks.push(key)
          const data = [key, value]
          timeLineData.push(data)
        }

        const timeLineHeader = ['x', values.feature]
        timeLineData = [[...timeLineHeader], ...timeLineData]
        // console.log('timeLineData :>> ', timeLineData)

        return finalCovariateShiftChart.push(
          <Col md={!!md ? md : 6} style={{ display: 'flex' }}>
            <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              loader={
                <div>
                  <Spinner size="sm" className="mr-3 pmd-spinner" />
                  Loading...{' '}
                </div>
              }
              data={timeLineData}
              options={{
                title: `Covariate Shifted Predictor: ${values.feature}`,
                vAxis: {
                  title: distanceMetric,
                  minValue: 0,
                  gridlines: {
                    color: 'transparent'
                  }
                },
                hAxis: {
                  title: `Comparison of different timelines of ${values.feature} with Base timeline`,
                  minValue: 0,
                  ticks: hticks,
                  gridlines: {
                    color: 'transparent'
                  }
                },
                series: {
                  1: { curveType: 'function' }
                },
                crosshair: {
                  color: '#ccc',
                  trigger: 'both',
                  orientation: 'vertical',
                  opacity: 0.8
                },
                legend: { position: 'bottom' },
                is3D: true
              }}
              // legendToggle
            />
          </Col>
        )
      })
    }
    // console.log('finalCovariateShiftChart :>> ', finalCovariateShiftChart)

    return (
      <React.Fragment>
        {!!SignificanceLevel && (
          <CardHeader className={`pmd-card-border col-md-${!!md ? md : 6}`}>
            <CardTitle tag="h6" className="mb-0">
              ALPHA PREDICTOR = {SignificanceLevel}, MIN SIGNIFICANCE COUNT =
              {SignificanceMinSupport}
            </CardTitle>
          </CardHeader>
        )}

        {!!finalCovariateShiftChart &&
          finalCovariateShiftChart.length > 0 &&
          finalCovariateShiftChart}
      </React.Fragment>
    )
  }
}

export { CovariateChartWidgets }
