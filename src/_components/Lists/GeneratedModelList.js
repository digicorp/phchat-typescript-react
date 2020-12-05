import React from 'react'
import { connect } from 'react-redux'
import { Label, Col } from 'reactstrap'

import { AvGroup } from 'availity-reactstrap-validation'
import AvSelect from '@availity/reactstrap-validation-select'

import { alphapiActions } from '../../_actions'

class GeneratedModelList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.generatedModelChange = this.generatedModelChange.bind(this)
  }

  UNSAFE_componentWillMount() {
    const { dispatch } = this.props
    // @api to get generatedModel list
    dispatch(alphapiActions.listGeneratedModel())
  }

  generatedModelChange = (fieldName, value) => {
    console.log('fieldName :>> ', fieldName)
    console.log('value :>> ', value)
    this.props.onGeneratedModelChange(fieldName, value)
  }

  render() {
    const {
      generatedmodel_list,
      label,
      value,
      required,
      showLable,
      md
    } = this.props

    const final_generatedmodel_list = []
    if (!!generatedmodel_list) {
      generatedmodel_list.map((values) => {
        return final_generatedmodel_list.push({
          label: `${values.modelname}`,
          value: values.id
        })
      })
    }

    return (
      <React.Fragment>
        {!!generatedmodel_list && (
          <React.Fragment>
            <Col md={!!md ? md : 6}>
              <AvGroup className="av-cs-wrap">
                {!!showLable && <Label>Model name</Label>}
                <AvSelect
                  placeholder="Select Model..."
                  name="model_id"
                  options={final_generatedmodel_list}
                  defaultValue={
                    !!value
                      ? {
                          label,
                          value
                        }
                      : ''
                  }
                  onChange={this.generatedModelChange.bind(this, 'model_id')}
                  required={!!required ? required : false}
                />

                <div className="invalid-feedback">
                  Please select model name!
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
  const { generatedmodel_list } = state.generated_model
  return { generatedmodel_list }
}
const connected_component = connect(mapStateToProps)(GeneratedModelList)
export { connected_component as GeneratedModelList }
