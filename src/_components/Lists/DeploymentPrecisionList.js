import React from 'react'
import { connect } from 'react-redux'

import { Label, Col } from 'reactstrap'

import { AvGroup } from 'availity-reactstrap-validation'
import AvSelect from '@availity/reactstrap-validation-select'

import { alphapiActions } from '../../_actions'

class DeploymentPrecisionList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.precisionChange = this.precisionChange.bind(this)
  }

  UNSAFE_componentWillMount() {
    const { dispatch } = this.props
    // @api to get domain list
    dispatch(alphapiActions.listDeploymentPrecision())
  }

  precisionChange = (fieldName, value) => {
    this.props.onPrecisionChange(fieldName, value)
  }

  render() {
    const {
      deployment_precision_list,
      md,
      label,
      value,
      required,
      showLable
    } = this.props

    const final_precision_list = []
    if (!!deployment_precision_list) {
      deployment_precision_list.map((values) => {
        return final_precision_list.push({
          label: `${values.name}`,
          value: values.id
        })
      })
    }

    return (
      <React.Fragment>
        {!!deployment_precision_list && (
          <React.Fragment>
            <Col md={!!md ? md : 6}>
              <AvGroup className="av-cs-wrap">
                {!!showLable && <Label>Deployment Precision</Label>}

                <AvSelect
                  placeholder="Select deployment precision..."
                  name="precision_id"
                  options={final_precision_list}
                  defaultValue={
                    !!value
                      ? {
                          label,
                          value
                        }
                      : ''
                  }
                  onChange={this.precisionChange.bind(this, 'precision')}
                  required={!!required ? required : false}
                />
                <div className="invalid-feedback">
                  Please select deployment precision!
                </div>
              </AvGroup>
            </Col>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { deployment_precision_list } = state.deployment_precision
  return { deployment_precision_list }
}
const connected_component = connect(mapStateToProps)(DeploymentPrecisionList)
export { connected_component as DeploymentPrecisionList }
