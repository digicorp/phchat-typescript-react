import React from 'react'
import { connect } from 'react-redux'
import { Label, Col } from 'reactstrap'

import { AvGroup, AvFeedback } from 'availity-reactstrap-validation'
import AvSelect from '@availity/reactstrap-validation-select'

import { alphapiActions } from '../../_actions'

class ModelFormatList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.modelFormatChange = this.modelFormatChange.bind(this)
  }

  UNSAFE_componentWillMount() {
    const { dispatch } = this.props
    // @api to get domain list
    dispatch(alphapiActions.listModelFormat())
  }

  modelFormatChange = (fieldName, value) => {
    this.props.onModelFormatChange(fieldName, value)
  }

  render() {
    const {
      model_format_list,
      md,
      label,
      value,
      showLable,
      required
    } = this.props

    const final_model_format_list = []
    if (!!model_format_list) {
      model_format_list.map((value) => {
        return final_model_format_list.push({
          label: `${value.full_name}`,
          value: value.name
        })
      })
    }

    return (
      <React.Fragment>
        {!!model_format_list && (
          <React.Fragment>
            <Col md={!!md ? md : 6}>
              <AvGroup className="av-cs-wrap">
                {!!showLable && <Label>Model Format</Label>}

                <AvSelect
                  placeholder="Select model format..."
                  name="model_format_id"
                  options={final_model_format_list}
                  defaultValue={
                    !!value
                      ? {
                          label,
                          value
                        }
                      : ''
                  }
                  onChange={this.modelFormatChange.bind(
                    this,
                    'model_format'
                  )}
                  required={!!required ? required : false}
                />
                <div className="invalid-feedback">
                  Please select model format!
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
  const { model_format_list } = state.model_format
  return { model_format_list }
}
const connected_component = connect(mapStateToProps)(ModelFormatList)
export { connected_component as ModelFormatList }
