import React from 'react'
import { connect } from 'react-redux'

import { Label, Col } from 'reactstrap'

import { AvGroup } from 'availity-reactstrap-validation'
import AvSelect from '@availity/reactstrap-validation-select'

import { alphapiActions, tagsActions } from '../../_actions'

class BaseModelList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.baseModelChange = this.baseModelChange.bind(this)
  }

  UNSAFE_componentWillMount() {
    const { dispatch, isGenerateModelPage } = this.props
    // @api to get basemodel
    if (isGenerateModelPage) {
      // get base model on the basis of domain and subdomain
      const searchModel = {
        callType: 'getModel',
        domain_id: localStorage.getItem('domain'),
        subdomain_id: localStorage.getItem('sub_domain')
      }

      dispatch(tagsActions.getModels(searchModel))
    } else {
      // get all the base model list
      dispatch(alphapiActions.listBaseModel())
    }
  }

  baseModelChange = (fieldName, value) => {
    console.log('fieldName :>> ', fieldName)
    console.log('value :>> ', value)
    this.props.onBaseModelChange(fieldName, value)
  }

  render() {
    let {
      allModelList,
      ModelList,
      label,
      value,
      required,
      showLable,
      md,
      isGenerateModelPage
    } = this.props

    if (isGenerateModelPage) allModelList = ModelList

    const final_model_list = []
    if (!!allModelList) {
      allModelList.map((values) => {
        return final_model_list.push({
          label: `${values.fullname}`,
          value: values.name
        })
      })
    }

    return (
      <React.Fragment>
        {!!allModelList && (
          <React.Fragment>
            <Col md={!!md ? md : 6}>
              <AvGroup className="av-cs-wrap">
                {!!showLable && <Label>Base Model</Label>}

                <AvSelect
                  placeholder="Select base model..."
                  name="basemodelName"
                  options={final_model_list}
                  onChange={this.baseModelChange.bind(this, 'basemodelName')}
                  required={!!required ? required : false}
                />

                <div className="invalid-feedback">
                  Please select base model!
                </div>

                <small className="form-text text-muted">
                  This will help to generate an AI-based model.
                </small>
              </AvGroup>
            </Col>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  let { model_list: allModelList } = state.basemodel
  let { models_list: ModelList } = state.tags

  return { allModelList, ModelList }
}
const connected_component = connect(mapStateToProps)(BaseModelList)
export { connected_component as BaseModelList }
