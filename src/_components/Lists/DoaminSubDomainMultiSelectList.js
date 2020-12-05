import React from 'react'
import { connect } from 'react-redux'
import { Label, Col } from 'reactstrap'
import Select from 'react-select'

import { userActions } from '../../_actions'

class DoaminSubDomainMultiSelectlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.domainSubDomainChange = this.domainSubDomainChange.bind(this)
  }

  UNSAFE_componentWillMount() {
    const { dispatch } = this.props
    dispatch(userActions.getAll())
  }

  domainSubDomainChange = (fieldName, value) => {
    this.props.onDomainSubDomainChange(fieldName, value.value)
  }

  render() {
    const customStyles = {
      control: (base) => ({
        ...base,
        height: 50,
        minHeight: 50
      })
    }

    const { md, showLable, domainSubDomain_list } = this.props

    const final_domain_list = []
    if (!!domainSubDomain_list) {
      domainSubDomain_list.map((values) => {
        return final_domain_list.push({
          label: `${values.name}`,
          value: values.id
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
                // isMulti
                name="colors"
                options={final_domain_list}
                onChange={this.domainSubDomainChange.bind(this, 'receiver')}
                className="multiselectDomain"
                styles={customStyles}
              />
            </Col>
          </React.Fragment>
        )}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { items: domainSubDomain_list } = state.users
  return { domainSubDomain_list }
}
const connected_component = connect(mapStateToProps)(
  DoaminSubDomainMultiSelectlist
)
export { connected_component as DoaminSubDomainMultiSelectlist }
