import React from 'react'
import { connect } from 'react-redux'
import { Label, Col } from 'reactstrap'

import { AvGroup } from 'availity-reactstrap-validation'
import AvSelect from '@availity/reactstrap-validation-select'

import { commonConstants } from '../../_constants'

class DataTypeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.dataTypeChange = this.dataTypeChange.bind(this)
  }

  dataTypeChange = (fieldName, value) => {
    this.props.onDataTypeChange(fieldName, value)
  }

  render() {
    const { md, showLable, label, value, required } = this.props

    const dataType = Object.keys(commonConstants.dataType)
    const final_data_type = []
    if (!!dataType) {
      dataType.map((element) => {
        return final_data_type.push({
          label: commonConstants.dataType[element],
          value: element
        })
      })
    }

    return (
      <React.Fragment>
        {!!dataType && (
          <React.Fragment>
            <Col md={!!md ? md : 6}>
              <AvGroup className="av-cs-wrap">
                {!!showLable && <Label>Model Format</Label>}

                <AvSelect
                  placeholder="Select file type..."
                  name="datatype"
                  options={final_data_type}
                  defaultValue={
                    !!value
                      ? {
                          label,
                          value
                        }
                      : ''
                  }
                  onChange={this.dataTypeChange.bind(this, 'datatype')}
                  required={!!required ? required : false}
                />

                <div className="invalid-feedback">
                  Please select data type!
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
  return {}
}
const connected_component = connect(mapStateToProps)(DataTypeList)
export { connected_component as DataTypeList }
