import React from 'react'
import { connect } from 'react-redux'
import { Label, Col } from 'reactstrap'

import { AvGroup } from 'availity-reactstrap-validation'
import AvSelect from '@availity/reactstrap-validation-select'

import { commonConstants } from '../../_constants'

class FeatureTypeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.featureTypeChange = this.featureTypeChange.bind(this)
  }

  featureTypeChange = (fieldName, value) => {
    this.props.onDataTypeChange(fieldName, value)
  }

  render() {
    const { md, showLable, label, value, required } = this.props

    const featureType = Object.keys(commonConstants.featureType)
    const final_feature_type = []
    if (!!featureType) {
      featureType.map((element) => {
        return final_feature_type.push({
          label: commonConstants.featureType[element],
          value: element
        })
      })
    }


    return (
      <React.Fragment>
        {!!featureType && (
          <React.Fragment>
            {/* <Col md={!!md ? md : 6}> */}
              <AvGroup className="av-cs-wrap">
                {!!showLable && <Label>Model Format</Label>}

                <AvSelect
                  placeholder="Select feature type..."
                  name="featureType"
                  options={final_feature_type}
                  defaultValue={
                    !!value
                      ? {
                          label,
                          value
                        }
                      : ''
                  }
                  onChange={this.featureTypeChange.bind(this, 'feature_type')}
                  required={!!required ? required : false}
                />

                <div className="invalid-feedback">
                  Please select feature type!
                </div>

              </AvGroup>
            {/* </Col> */}
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
    return{}
}
const connected_component = connect(mapStateToProps)(FeatureTypeList)
export { connected_component as FeatureTypeList }
