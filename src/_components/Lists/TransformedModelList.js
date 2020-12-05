import React from 'react'
import { connect } from 'react-redux'

import { Label, Col } from 'reactstrap'

import { AvGroup } from 'availity-reactstrap-validation'
import AvSelect from '@availity/reactstrap-validation-select'

import { commonConstants } from '../../_constants'

class TransFormedModelList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.transformedModelChange = this.transformedModelChange.bind(this)
  }

  UNSAFE_componentWillMount() {
   
  }

  precisionChange = (fieldName, value) => {
    this.props.ontransformedModelChange(fieldName, value)
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
    
    const transformedModellist = Object.keys(commonConstants.transformedModel)
    const finalTransformedModel = []
    if (!!transformedModellist) {
        transformedModellist.map((element) => {
        return finalTransformedModel.push({
          label: commonConstants.transformedModel[element],
          value: element
        })
      })
    }

    return (
      <React.Fragment>
        {!!transformedModellist && (
          <React.Fragment>
            <Col md={!!md ? md : 6}>
              <AvGroup className="av-cs-wrap">
                {!!showLable && <Label>TransFormed Model</Label>}

                <AvSelect
                  placeholder="Select Transformed Model..."
                  name="precision_id"
                  options={finalTransformedModel}
                  defaultValue={
                    !!value
                      ? {
                          label,
                          value
                        }
                      : ''
                  }
                  onChange={this.transformedModelChange.bind(this, 'precision')}
                  required={!!required ? required : false}
                />
                <div className="invalid-feedback">
                  Please select transformed model!
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
const connected_component = connect(mapStateToProps)(TransFormedModelList)
export { connected_component as TransFormedModelList }
