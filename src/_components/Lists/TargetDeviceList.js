import React from 'react'
import { connect } from 'react-redux'
import { Label, Col, Button } from 'reactstrap'

import { AvGroup } from 'availity-reactstrap-validation'
import AvSelect from '@availity/reactstrap-validation-select'

import { alphapiActions } from '../../_actions'
import { getDomain } from '../../_helpers'

class TargetDeviceList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.targetDeviceChange = this.targetDeviceChange.bind(this)
  }

  UNSAFE_componentWillMount() {
    const { dispatch, apiType, device_type } = this.props
    // @api to get targetdevice list
    dispatch(alphapiActions.listTargetDevice(apiType, device_type))
  }

  targetDeviceChange = (fieldName, value) => {
    this.props.onTargetDeviceChange(fieldName, value)
  }

  render() {
    const { device_list, md, showLable, label, value, required } = this.props

    const final_device_list = []
    if (!!device_list) {
      device_list.map((values, index) => {
        return final_device_list.push({
          value: values.target_key,
          label: (
            <div key={index} className="d-flex select-option-img">
              <img
                src={`${getDomain().host}/${values.image}`}
                alt="Icon"
                width="32"
                className="mr-3"
              />
              {values.name}
            </div>
          )
        })
      })
    }

    return (
      <React.Fragment>
        {!!device_list && (
          <React.Fragment>
            <Col md={!!md ? md : 6}>
              <AvGroup className="av-cs-wrap">
                {!!showLable && <Label>Model Format</Label>}

                <AvSelect
                  placeholder="Select target device..."
                  name="target_device"
                  options={final_device_list}
                  defaultValue={
                    !!value
                      ? {
                          label,
                          value
                        }
                      : ''
                  }
                  onChange={this.targetDeviceChange.bind(this, 'target_device')}
                  required={!!required ? required : false}
                />

                <div className="invalid-feedback">
                  Please select target device!
                </div>

                <small className="form-text text-muted">
                  This will help to give out hardware and model for AI model
                  deployment.
                </small>
              </AvGroup>
              {/* <Button
                disabled
                color="dark"
                className="btn-sm pmd-ripple-effect mt-2"
              >
                Automatic Select
              </Button> */}
            </Col>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { device_list } = state.targetdevice
  return { device_list }
}
const connected_component = connect(mapStateToProps)(TargetDeviceList)
export { connected_component as TargetDeviceList }
