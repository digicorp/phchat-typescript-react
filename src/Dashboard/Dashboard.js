import React from 'react'
import { connect } from 'react-redux'
import { ModelCardWidgets } from '../_components/Widgets'

import {
  Media,
  Card,
  Button,
  CardTitle,
  CardBody,
  Row,
  Col,
  Container,
  CardHeader,
  Tooltip
} from 'reactstrap'

import workingModels from '../../public/assets/img/page/ic_working-models.svg'
import targetDevices from '../../public/assets/img/page/ic_target-devices.svg'
import usageTime from '../../public/assets/img/page/ic_usage-time.svg'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tooltipModelOpen: false,
      tooltipDeviceOpen: false,
      tooltipTimeOpen: false
    }

    this.toggleTab = this.toggleTab.bind(this)
    this.tooltipModelOpen = this.tooltipModelOpen.bind(this)
    this.tooltipDeviceOpen = this.tooltipDeviceOpen.bind(this)
    this.tooltipTimeOpen = this.tooltipTimeOpen.bind(this)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  tooltipModelOpen() {
    this.setState({
      tooltipModelOpen: !this.state.tooltipModelOpen
    })
  }
  tooltipDeviceOpen() {
    this.setState({
      tooltipDeviceOpen: !this.state.tooltipDeviceOpen
    })
  }
  tooltipTimeOpen() {
    this.setState({
      tooltipTimeOpen: !this.state.tooltipTimeOpen
    })
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          {/* Analytics Overview */}
          <div className="pmd-detail-section analytics-section">
            <div className="d-md-flex analytics-sec-title align-items-center justify-content-md-between pmd-detail-title">
              <h3>Analytics Overview</h3>
            </div>
            {/* <Row>
              <Col lg="4">
                <Card className="pmd-card w-100 mb-lg-0">
                  <CardBody className="d-flex justify-content-between">
                    <Media>
                      <i className="bg-completed-light pmd-icon-circle pmd-icon-lg mr-3">
                        <img
                          src={workingModels}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </i>
                      <Media body>
                        <CardTitle
                          tag="p"
                          className="text-uppercase mb-0 font-weight-bold"
                        >
                          Working Models
                        </CardTitle>
                        <h2 className="pmd-display3 d-flex mb-0">
                          15{' '}
                          <span className="text-success analytics-percentage">
                            <i className="material-icons">arrow_drop_up</i>8%
                          </span>
                        </h2>
                      </Media>
                    </Media>
                    <Media right middle>
                      <Button
                        id="tooltipWorkingModel"
                        className="btn pmd-btn-fab pmd-ripple-effect pmd-btn-flat btn-xs"
                        color="grey"
                      >
                        <i className="material-icons pmd-sm">help</i>
                      </Button>
                      <Tooltip
                        placement="top"
                        isOpen={this.state.tooltipModelOpen}
                        target="tooltipWorkingModel"
                        toggle={this.tooltipModelOpen}
                        className="pmd-tooltip"
                      >
                        This is tooltip for working model.
                      </Tooltip>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="pmd-card w-100 mb-lg-0">
                  <CardBody className="d-flex justify-content-between">
                    <Media>
                      <i className="bg-primary-light pmd-icon-circle pmd-icon-lg mr-3">
                        <img
                          src={targetDevices}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </i>
                      <Media body>
                        <CardTitle
                          tag="p"
                          className="text-uppercase mb-0 font-weight-bold"
                        >
                          Target Devices
                        </CardTitle>
                        <h2 className="pmd-display3 d-flex mb-0">
                          155{' '}
                          <span className="text-success analytics-percentage">
                            <i className="material-icons">arrow_drop_up</i>34%
                          </span>
                        </h2>
                      </Media>
                    </Media>
                    <Media right middle>
                      <Button
                        id="tooltipTargetDevice"
                        className="btn pmd-btn-fab pmd-ripple-effect pmd-btn-flat btn-xs"
                        color="grey"
                      >
                        <i className="material-icons pmd-sm">help</i>
                      </Button>
                      <Tooltip
                        placement="top"
                        isOpen={this.state.tooltipDeviceOpen}
                        target="tooltipTargetDevice"
                        toggle={this.tooltipDeviceOpen}
                        className="pmd-tooltip"
                      >
                        This is tooltip for target devices.
                      </Tooltip>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="4">
                <Card className="pmd-card w-100 mb-lg-0">
                  <CardBody className="d-flex justify-content-between">
                    <Media>
                      <i className="bg-inprogess-light pmd-icon-circle pmd-icon-lg mr-3">
                        <img src={usageTime} alt="Icon" className="img-fluid" />
                      </i>
                      <Media body>
                        <CardTitle
                          tag="p"
                          className="text-uppercase mb-0 font-weight-bold"
                        >
                          Usage Time
                        </CardTitle>
                        <h2 className="pmd-display3 d-flex mb-0">
                          10 <p className="usage-timercounter">days</p>
                          <span className="text-danger analytics-percentage">
                            <i className="material-icons">arrow_drop_down</i>12%
                          </span>
                        </h2>
                      </Media>
                    </Media>
                    <Media right middle>
                      <Button
                        id="tooltipUsageTime"
                        className="btn pmd-btn-fab pmd-ripple-effect pmd-btn-flat btn-xs"
                        color="grey"
                      >
                        <i className="material-icons pmd-sm">help</i>
                      </Button>
                      <Tooltip
                        placement="top"
                        isOpen={this.state.tooltipTimeOpen}
                        target="tooltipUsageTime"
                        toggle={this.tooltipTimeOpen}
                        className="pmd-tooltip"
                      >
                        This is tooltip for usage time.
                      </Tooltip>
                    </Media>
                  </CardBody>
                </Card>
              </Col>
            </Row> */}
          </div>
          {/* End Analytics Overview */}

          {/* Subdomains and Basemodels */}
          <div className="pmd-detail-section">
            {/* model widgets */}
            <ModelCardWidgets is_dashboard={true}></ModelCardWidgets>
            {/* END model widgets */}
          </div>
          {/* End Subdomains and Basemodels */}
        </Container>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

const connectedDashboard = connect(mapStateToProps)(Dashboard)
export { connectedDashboard as Dashboard }
