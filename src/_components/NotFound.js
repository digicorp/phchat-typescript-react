import React from "react";
import { connect } from "react-redux";
import { Container, Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

import errorimage from "../../public/assets/img/logo/logo-grey.svg";

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Initial State..
    };
  }
  render() {
    return (
      <div className="errorpage d-flex align-items-center">
        <Container>
          <Row>
            <Col className="text-center mx-auto" lg="6" md="9">
              <img
                src={errorimage}
                alt="Error 404"
                className="img-fluid errorpage-image"
              />
              <h1 className="font-weight-bold pmd-display3">Error 404</h1>
              <p className="">
                Sorry, we couldn’t find the page you were looking for. To return
                to the homepage click on the button below.
              </p>
              <Link
                to="/dashboard"
                className="btn btn-link btn-primary pmd-ripple-effect"
              >
                Back to Home
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {};
}
const connectedNotFound = connect(mapStateToProps)(NotFound);
export { connectedNotFound as NotFound };
