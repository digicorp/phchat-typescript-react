import React from 'react'
import { connect } from 'react-redux'
import { Label, Col } from 'reactstrap'
import Select from 'react-select'

import { domainActions } from '../../_actions'
class DoaminSubDomainMultiSelectlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.domainSubDomainChange = this.domainSubDomainChange.bind(this)
  }

  UNSAFE_componentWillMount() {
    const { dispatch } = this.props
    dispatch(domainActions.listDomainSubDomain())
  }

  domainSubDomainChange = (fieldName, value) => {
    this.props.onDomainSubDomainChange(fieldName, value)
  }

  render() {
    const customStyles = {
      control: base => ({
        ...base,
        height: 50,
        minHeight: 50
      })
    }

    const {
      md,
      showLable,
      label,
      value,
      required,
      domainSubDomain_list
    } = this.props

    const final_domain_list = []
    if (!!domainSubDomain_list) {
      domainSubDomain_list.map(values => {
        return final_domain_list.push({
          label: `${values.name}`,
          value: values.value
        })
      })
    }

    return (
      <React.Fragment>
        {!!domainSubDomain_list && (
          <React.Fragment>
            <Col md={!!md ? md : 6}>
              {!!showLable && <Label>Model Format</Label>}

              <Select
                isMulti
                name="colors"
                options={final_domain_list}
                onChange={this.domainSubDomainChange.bind(
                  this,
                  'domainSubDomain'
                )}
                className="multiselectDomain"
                styles={customStyles}
              />

              <div className="invalid-feedback">Please select data type!</div>
            </Col>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { domainSubDomain_list } = state.domain
  return { domainSubDomain_list }
}
const connected_component = connect(mapStateToProps)(
  DoaminSubDomainMultiSelectlist
)
export { connected_component as DoaminSubDomainMultiSelectlist }
