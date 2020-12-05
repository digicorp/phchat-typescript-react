import React from 'react'
import { connect } from 'react-redux'

import { Label, Col } from 'reactstrap'

import { AvGroup } from 'availity-reactstrap-validation'
import AvSelect from '@availity/reactstrap-validation-select'

import { alphapiActions } from '../../_actions'

class DataPrepList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.dataPrepcmdChange = this.dataPrepcmdChange.bind(this)
  }

  UNSAFE_componentWillMount() {
    const { dispatch } = this.props
    // @api to get data-prep-cmd list
    dispatch(alphapiActions.listDataPrepCmd())
  }

  dataPrepcmdChange = (fieldName, value) => {
    this.props.onDataPrepcmdChange(fieldName, value)
  }

  render() {
    const {
      dataprep_cmd_list,
      showLable,
      md,
      required,
      label,
      value
    } = this.props

    const final_dataprep_cmd_list = []
    if (!!dataprep_cmd_list) {
      dataprep_cmd_list.map((values) => {
        return final_dataprep_cmd_list.push({
          label: `${values.name}`,
          value: values.name
        })
      })
    }

    return (
      <React.Fragment>
        {!!dataprep_cmd_list && (
          <React.Fragment>
            <Col md={!!md ? md : 6}>
              <AvGroup className="av-cs-wrap">
                {!!showLable && <Label>Data Prep</Label>}

                <AvSelect
                  placeholder="Select data prepcmd..."
                  name="dataPrepCmd"
                  options={final_dataprep_cmd_list}
                  onChange={this.dataPrepcmdChange.bind(this, 'dataPrepCmd')}
                  required={!!required ? required : false}
                />
                <div className="invalid-feedback">
                  Please select data prepcmd!
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
  const { dataprep_cmd_list } = state.dataprep
  return { dataprep_cmd_list }
}
const connected_component = connect(mapStateToProps)(DataPrepList)
export { connected_component as DataPrepList }
