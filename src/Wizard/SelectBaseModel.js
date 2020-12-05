import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { store } from "../_helpers";
import { Container, Col, Row } from "reactstrap";
import { ModelCardWidgets } from "../_components/Widgets";

class SelectBaseModel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { domain: "", subDomain: "", subDomainName: "" };
    this.onNextStrep = this.onNextStrep.bind(this);
  }

  UNSAFE_componentWillMount() {
    const domain = localStorage.getItem("domain");
    const sub_domain = localStorage.getItem("sub_domain");
    if (!!domain && domain !== undefined && domain !== null) {
      this.setState({ domain });
    }
    if (!!sub_domain && sub_domain !== undefined && sub_domain !== null)
      this.setState({
        subDomain: sub_domain
      });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (
      !!store.getState().domain &&
      !!store.getState().domain.subdomain_list &&
      !!Array.isArray(store.getState().domain.subdomain_list) &&
      store.getState().domain.subdomain_list.length > 0
    ) {
      let sub_domain = store
        .getState()
        .domain.subdomain_list.filter(
          element => Number(element.id) === Number(this.state.subDomain)
        );
      if (!!Array.isArray(sub_domain) && sub_domain.length > 0) {
        this.setState({ subDomainName: sub_domain[0].name });
      }
    }
  }

  onNextStrep() {
    this.props.onUpdateStep(4);
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          {/****** Step 2 : Model Selection ******/}
          <div className="step2-body">
            <Row className="mb-50 justify-content-center">
              <Col xl="8" lg="10" className="text-center">
                <h1 className="mt-lg-4">
                  Choose the base model you require for{" "}
                  {!!this.state.subDomainName
                    ? this.state.subDomainName
                    : this.state.domain}
                </h1>
                <p className="lead mb-0">
                  Choose AI/ML base model to generate from or discover a new
                  base model or fine tune existing AI/ML model
                </p>
              </Col>
            </Row>

            {/* model widgets */}
            <ModelCardWidgets
              goToNextStrep={this.onNextStrep}
            ></ModelCardWidgets>
            {/* END model widgets */}

            <Row>
              <Col sm="12" className="text-center">
                <Link
                  className="btn btn-primary pmd-btn-icon pmd-btn-raised pmd-ripple-effect btn-lg w-xs-100"
                  to="/dashboard"
                >
                  Go to Dashboard <i className="material-icons md-light pmd-icon-sm ml-2 mr-0">arrow_right_alt</i>
                </Link>
              </Col>
            </Row>
          </div>
          {/****** End Step 2 : Model Selection ******/}
        </Container>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedSelectBaseModel = connect(mapStateToProps)(SelectBaseModel);
export { connectedSelectBaseModel as SelectBaseModel };
