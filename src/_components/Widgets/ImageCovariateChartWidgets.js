import React from 'react'
import Chart from 'react-google-charts'
import { Col, Spinner } from 'reactstrap'

class ImageCovariateChartWidgets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { md, covariateShiftData = [] } = this.props
    // console.log('covariateShiftData :>> ', covariateShiftData)

    const {
      model = '',
      baselineLoss = 0,
      timelineLoss = []
    } = covariateShiftData

    const timeLineHeader = ['x', 'Base Line Loss', 'Timeline Loss']
    let timeLineData = []
    let hTicks = []

    for (let [key, value] of timelineLoss.entries()) {
      key = key + 1
      hTicks.push(key)
      const data = [key, baselineLoss, value]
      timeLineData.push(data)
    }

    timeLineData = [[...timeLineHeader], ...timeLineData]
    // console.log('timeLineData :>> ', timeLineData)

    return (
      <React.Fragment>
        {!!timeLineData && (
          <Col md={!!md ? md : 6} style={{ display: 'flex' }}>
            <Chart
              chartType="LineChart"
              width="100%"
              height="400px"
              loader={
                <div>
                  <Spinner size="sm" className="mr-3 pmd-spinner" />
                  Loading...
                </div>
              }
              data={timeLineData}
              options={{
                colors: ['#9b34eb', 'red', 'red', '#349feb'],
                title: 'Covariate Shift: Auto-Encoder Reconstruction Error',
                vAxis: {
                  title: 'Auto-Encoder Reconstruction Error',
                  minValue: 0,
                  gridlines: {
                    color: 'transparent'
                  }
                },
                explorer: {
                  actions: ['dragToZoom', 'rightClickToReset'],
                  axis: 'vertical',
                  keepInBounds: true,
                  maxZoomIn: 4.0
                },
                hAxis: {
                  title: 'Timeline',
                  minValue: 0,
                  ticks: hTicks, // display labels every 1 step
                  gridlines: {
                    color: 'transparent'
                  }
                },
                series: {
                  0: {
                    lineWidth: 2,
                    lineDashStyle: [7, 2, 4, 3]
                  },
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
        )}
      </React.Fragment>
    )
  }
}

export { ImageCovariateChartWidgets }
