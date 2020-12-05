import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import {
  Container,
  Col,
  Row,
  Label,
  CardBody,
  CardText,
  CustomInput,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input
} from "reactstrap";
import { alphapiActions, domainActions } from "../_actions";

import fileUpload from "../../public/assets/img/page/ic_file-upload.svg";

class SelectSubDomain extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      domain: "",
      domainName: "",
      subDomain: "",
      filter: {}
    };

    this.onSubDomainChanged = this.onSubDomainChanged.bind(this);
    this.onNextStrep = this.onNextStrep.bind(this);
    this.toggleDomainAddNew = this.toggleDomainAddNew.bind(this);
  }

  UNSAFE_componentWillMount() {
    const { dispatch } = this.props;
    const domain = localStorage.getItem("domain");
    const domainName = localStorage.getItem("domain_name");
    const sub_domain = localStorage.getItem("sub_domain");
    if (!!domain && domain !== undefined && domain !== null) {
      const { filter } = this.state;
      this.setState(
        { domain, domainName, filter: { ...filter, domain_id: domain } },
        () => {
          // @api to get  sub-domain list
          dispatch(domainActions.listSubDomain({ filter: this.state.filter }));
        }
      );
    }
    if (!!sub_domain && sub_domain !== undefined && sub_domain !== null)
      this.setState({
        subDomain: sub_domain
      });
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onSubDomainChanged(event) {
    this.setState(
      {
        subDomain: event.target.value,
        subDomainName: event.currentTarget.getAttribute("data-sub_domain_name")
      },
      () => {
        if (
          !!this.state.subDomain &&
          this.state.subDomain !== undefined &&
          this.state.subDomain !== null
        ) {
          localStorage.setItem("sub_domain", this.state.subDomain);
          localStorage.setItem("sub_domain_name", this.state.subDomainName);
        }
        this.onNextStrep();
      }
    );
  }

  onNextStrep(event) {
    this.props.onUpdateStep(3);
  }

  toggleDomainAddNew() {
    this.setState({
      modalAddNew: !this.state.modalAddNew
    });
  }

  render() {
    let subdomain_structure = [];
    const subdomainList = !!this.props.subdomain_list
      ? this.props.subdomain_list
      : [];
    if (Array.isArray(subdomainList) && subdomainList.length > 0) {
      subdomainList.forEach((element, index) => {
        return subdomain_structure.push(
          <Col key={index} lg="4" md="6" className="d-flex">
            <Label
              className={`card pmd-card w-100 pmd-radio-card pmd-content-equal ${
                parseInt(this.state.subDomain) === parseInt(element.id)
                  ? " card-selected-item"
                  : ""
              }`}
              for={element.id.toString()}
            >
              <div className="pmd-content-wrapper">
                <CardBody className="d-flex align-items-center">
                  <CustomInput
                    data-sub_domain_name={element.name}
                    checked={
                      parseInt(this.state.subDomain) === parseInt(element.id)
                    }
                    onChange={this.onSubDomainChanged}
                    onClick={this.onSubDomainChanged}
                    className="pmd-radio subdomain-selection-radio"
                    type="radio"
                    value={element.id}
                    id={element.id.toString()}
                    label={element.name}
                    name="subdomainSelection"
                  />
                </CardBody>
              </div>
            </Label>
          </Col>
        );
      });
    }

    return (
      <React.Fragment>
        <Container>
          {/****** Step 1 : Domain and Sub-domain Selection ******/}
          <div className="step1-body">
            {/* Domain Select */}
            <Row className="mb-50 justify-content-center">
              <Col xl="8" lg="10" className="text-center">
                <div className="mb-4">
                  <h1 className="mb-0 mt-lg-4">
                    Select sub-domain for {this.state.domainName}
                  </h1>
                  <p className="mb-0 lead">
                    Choose a sub-domain to get started with the model
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="mb-50" id="domain">
              <Col lg="4" md="6" className="d-flex">
                <Link
                  to="/sub-domain"
                  className="card pmd-card w-100 text-center pmd-add-new pmd-content-equal"
                >
                  <div className="pmd-content-wrapper">
                    <CardBody className="d-flex align-items-center">
                      <div className="mr-3">
                        <i className="md-dark pmd-icon-circle bg-secondary-light pmd-icon-xs material-icons">
                          add
                        </i>
                      </div>
                      <CardText>Manage Sub-domain</CardText>
                    </CardBody>
                  </div>
                </Link>
              </Col>
              {/* sub-domain */}
              {subdomain_structure}
              {/* End sub-domain */}
            </Row>
            {/* End Domain Select */}

            {/* Next Step Button */}
            {/* <Row>
              <Col sm="12" className="text-center">
                <Button
                  color="dark"
                  id="step1"
                  className="btn pmd-btn-raised btn-lg w-xs-100"
                  onClick={this.onNextStrep}
                >
                  Save & continue
                </Button>
              </Col>
            </Row> */}
            {/* End Next Step Button */}
          </div>
          {/****** End Step 1 : Domain and Sub-domain Selection ******/}

          {/* Add domain modal */}
          <Modal
            isOpen={this.state.modalAddNew}
            className="pmd-modal modal-dialog-centered modal-addnew"
          >
            <ModalHeader className="modal-header pmd-modal-border">
              Add Domain
              <Button
                aria-hidden="true"
                data-dismiss="modal"
                className="pmd-btn-fab btn-xs pmd-btn-flat pmd-ripple-effect"
                color="dark"
                onClick={this.toggleDomainAddNew}
              >
                <i className="material-icons pmd-icon-xs md-dark">close</i>
              </Button>
            </ModalHeader>
            <ModalBody>
              <div className="mb-3">
                <Input
                  type="file"
                  name="file"
                  id="exampleFile"
                  className="d-none"
                />
                <Label className="upload-icon" for="exampleFile">
                  <span className="upload-icon-placeholder">
                    <img src={fileUpload} alt="Icon" className="img-fluid" />
                  </span>
                  <p className="upload-icon-text">Upload Icon</p>
                </Label>
              </div>
              <FormGroup>
                <Input
                  type="text"
                  name="newdomainname"
                  id="newdomainname"
                  required
                  placeholder="Enter domain name"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="textarea"
                  name="domaindesc"
                  id="domaindesc"
                  required
                  placeholder="Enter description"
                />
              </FormGroup>
              <div className="text-right">
                <Button
                  color="primary-light"
                  className="pmd-ripple-effect btn-sm"
                >
                  Add Subdomain
                </Button>
              </div>
            </ModalBody>
            <ModalFooter className="pmd-modal-border">
              <Button
                color="danger"
                className="btn-dark pmd-ripple-effect"
                onClick={this.toggleDomainAddNew}
              >
                Add domain
              </Button>
              <Button color="dark" className="pmd-btn-flat pmd-ripple-effect">
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
          {/* End Add domain modal */}
        </Container>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const connectedSelectSubDomain = connect(mapStateToProps)(SelectSubDomain);
export { connectedSelectSubDomain as SelectSubDomain };
