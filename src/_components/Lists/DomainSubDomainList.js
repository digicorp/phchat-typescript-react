import React from "react";
import { connect } from "react-redux";

import { Label, Col } from "reactstrap";

import { AvGroup } from "availity-reactstrap-validation";
import AvSelect from "@availity/reactstrap-validation-select";

import { domainActions } from "../../_actions";

class DomainSubDomainList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      domain_id: null,
      domain_name: null,
      subdomain_id: null,
      subdomain_name: null
    };
    this.domainChange = this.domainChange.bind(this);
    this.subDomainChange = this.subDomainChange.bind(this);
  }

  UNSAFE_componentWillMount() {
    const {
      dispatch,
      domain_id,
      domain_name,
      subdomain_id,
      subdomain_name
    } = this.props;

    this.setState({ domain_id, domain_name, subdomain_id, subdomain_name });

    // @api to get domain list
    dispatch(domainActions.listDomain());
    if (!!domain_id) this.loadSubDomain(domain_id);
  }

  domainChange = (fieldName, value) => {
    this.setState({ subdomain_id: null, subdomain_name: null });

    this.props.onDomainChange(fieldName, value);
    if (value) this.loadSubDomain(value);
  };

  loadSubDomain = domain_id => {
    // @api to get  sub-domain list
    const { dispatch } = this.props;
    const filter = { domain_id };
    dispatch(domainActions.listSubDomain({ filter }));
  };

  subDomainChange = (value, fieldName) => {
    this.props.onSubDomainChange(value, fieldName);
  };

  render() {
    const { domain_list, subdomain_list, md, required, showLable } = this.props;

    const final_domain_list = [];
    if (!!domain_list) {
      domain_list.map(values => {
        return final_domain_list.push({
          label: `${values.name}`,
          value: values.id
        });
      });
    }

    const final_subdomain_list = [];
    if (!!subdomain_list) {
      subdomain_list.map(values => {
        return final_subdomain_list.push({
          label: `${values.name}`,
          value: values.id
        });
      });
    }
    
    return (
      <React.Fragment>
        {!!domain_list && (
          <React.Fragment>
            <Col md={!!md ? md : 6}>
              <AvGroup className="av-cs-wrap">
                {!!showLable && <Label>Domain name</Label>}
                <AvSelect
                  placeholder="Select Domain..."
                  name="domain_id"
                  options={final_domain_list}
                  defaultValue={
                    this.state.domain_id > 0
                      ? {
                          label: this.state.domain_name,
                          value: this.state.domain_id
                        }
                      : ""
                  }
                  onChange={this.domainChange.bind(this, "domain_id")}
                  required={!!required ? required : false}
                />

                <div className="invalid-feedback">Please select domain!</div>
              </AvGroup>
            </Col>
            <Col md={!!md ? md : 6}>
              <AvGroup className="av-cs-wrap">
                {!!showLable && <Label>Subdomain name</Label>}
                <AvSelect
                  placeholder="Select sub domain..."
                  name="subdomain_id"
                  options={final_subdomain_list}
                  defaultValue={
                    this.state.subdomain_id > 0
                      ? {
                          label: this.state.subdomain_name,
                          value: this.state.subdomain_id
                        }
                      : ""
                  }
                  onChange={this.subDomainChange.bind(this, "subdomain_id")}
                  required={!!required ? required : false}
                />

                <div className="invalid-feedback">
                  Please select sub-domain!
                </div>
              </AvGroup>
            </Col>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { domain_list, subdomain_list } = state.domain;
  return { domain_list, subdomain_list };
}
const connected_component = connect(mapStateToProps)(DomainSubDomainList);
export { connected_component as DomainSubDomainList };
