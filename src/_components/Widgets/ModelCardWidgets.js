import React from "react";
import { Link } from "react-router-dom";
import { history } from "../../_helpers";

import {
  Col,
  Row,
  Card,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Media,
  CardHeader
} from "reactstrap";

import discover from "../../../public/assets/img/page/ic_discover.svg";
import generateAI from "../../../public/assets/img/page/ic_genearate-ai.svg";
import monitorAI from "../../../public/assets/img/page/ic_monitor-ai.svg";
import predictAI from "../../../public/assets/img/page/ic_predict-ai.svg";
import deployAI from "../../../public/assets/img/page/ic_deploy-ai.svg";
import historyImg from "../../../public/assets/img/page/ic_history.svg";
import tags from "../../../public/assets/img/page/ic_tags.svg";
import tagSubmit from "../../../public/assets/img/page/ic_tag-submit.svg";
import dataPrep from "../../../public/assets/img/page/ic_data-prep.svg";

class ModelCardWidgets extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.goToGenerateModel = this.goToGenerateModel.bind(this);
  }

  goToGenerateModel() {
    if (!!this.props.is_dashboard) history.push("/generate-ai-model");
    else this.props.goToNextStrep();
  }

  render() {
    return (
      <React.Fragment>
        <Row className="mb-50" id="modelSelection">
          <Col lg="4" md="6" className="d-flex">
            {/* Discover AI Model */}
            <Link
              className="card pmd-card pmd-content-equal pmd-model-card pmd-card-discover"
              to="discover"
            >
              <CardHeader className="card-header pmd-card-dark d-flex flex-row mb-0">
                <Media body className="d-flex align-items-center">
                  <CardTitle tag="h3">Discover AI Model</CardTitle>
                </Media>
                <Media
                  right
                  middle
                  className="pmd-icon-circle pmd-icon-md pmd-model-icon"
                >
                  <img src={discover} alt="Icon" className="img-fluid" />
                </Media>
              </CardHeader>
              <div className="pmd-content-wrapper">
                <CardBody>
                  <CardText>
                    Discover AI model is used for discovering newer base models
                    class.
                  </CardText>
                </CardBody>
                <CardFooter className="d-flex justify-content-end">
                  <span className="btn pmd-btn-fab btn-sm pmd-ripple-effect">
                    <i className="material-icons pmd-xs">arrow_forward</i>
                  </span>
                </CardFooter>
              </div>
            </Link>
          </Col>

          <Col lg="4" md="6" className="d-flex">
            {/* Generate AI Model */}
            <Card
              className="pmd-card pmd-content-equal pmd-model-card pmd-card-generate"
              onClick={this.goToGenerateModel}
            >
              <CardHeader className="card-header pmd-card-dark d-flex flex-row mb-0">
                <Media body className="d-flex align-items-center">
                  <CardTitle tag="h3">Generate AI Model</CardTitle>
                </Media>
                <Media
                  right
                  middle
                  className="pmd-icon-circle pmd-icon-md pmd-model-icon"
                >
                  <img src={generateAI} alt="Icon" className="img-fluid" />
                </Media>
              </CardHeader>
              <div className="pmd-content-wrapper">
                <CardBody>
                  <CardText>
                    Generate AI model is used for a model generation with a base
                    model.
                  </CardText>
                </CardBody>
                <CardFooter className="d-flex justify-content-end">
                  <span className="btn pmd-btn-fab btn-sm pmd-ripple-effect">
                    <i className="material-icons pmd-xs">arrow_forward</i>
                  </span>
                </CardFooter>
              </div>
              <Button
                id="step2"
                onClick={this.onNextStrep}
                className="card-clickable"
              ></Button>
            </Card>
          </Col>

          <Col lg="4" md="6" className="d-flex">
            {/* Monitor AI Model */}
            <Link
              className="card pmd-card pmd-content-equal pmd-model-card pmd-card-monitor"
              to="monitor"
            >
              <CardHeader className="card-header pmd-card-dark d-flex flex-row mb-0">
                <Media body className="d-flex align-items-center">
                  <CardTitle tag="h3">Monitor AI Model</CardTitle>
                </Media>
                <Media
                  right
                  middle
                  className="pmd-icon-circle pmd-icon-md pmd-model-icon"
                >
                  <img src={monitorAI} alt="Icon" className="img-fluid" />
                </Media>
              </CardHeader>
              <div className="pmd-content-wrapper">
                <CardBody>
                  <CardText>
                    Monitor AI model is used for monitoring model function.
                  </CardText>
                </CardBody>
                <CardFooter className="d-flex justify-content-end">
                  <span className="btn pmd-btn-fab btn-sm pmd-ripple-effect">
                    <i className="material-icons pmd-xs">arrow_forward</i>
                  </span>
                </CardFooter>
              </div>
            </Link>
          </Col>

          <Col lg="4" md="6" className="d-flex">
            {/* Prectict using AI Model */}
            <Link
              className="card pmd-card pmd-content-equal pmd-model-card pmd-card-predict"
              to="predict"
            >
              <CardHeader className="card-header pmd-card-dark d-flex flex-row mb-0">
                <Media body className="d-flex align-items-center">
                  <CardTitle tag="h3">Predict using AI model</CardTitle>
                </Media>
                <Media
                  right
                  middle
                  className="pmd-icon-circle pmd-icon-md pmd-model-icon"
                >
                  <img src={predictAI} alt="Icon" className="img-fluid" />
                </Media>
              </CardHeader>
              <div className="pmd-content-wrapper">
                <CardBody>
                  <CardText>
                    Predict AI model is used for online prediction from the
                    generated model.
                  </CardText>
                </CardBody>
                <CardFooter className="d-flex justify-content-end">
                  <span className="btn pmd-btn-fab btn-sm pmd-ripple-effect">
                    <i className="material-icons pmd-xs">arrow_forward</i>
                  </span>
                </CardFooter>
              </div>
            </Link>
          </Col>

          <Col lg="4" md="6" className="d-flex">
            {/* Deploy AI Model */}
            <Link
              className="card pmd-card pmd-content-equal pmd-model-card pmd-card-deploy"
              to="deploy"
            >
              <CardHeader className="card-header pmd-card-dark d-flex flex-row mb-0">
                <Media body className="d-flex align-items-center">
                  <CardTitle tag="h3">Deploy AI Model</CardTitle>
                </Media>
                <Media
                  right
                  middle
                  className="pmd-icon-circle pmd-icon-md pmd-model-icon"
                >
                  <img src={deployAI} alt="Icon" className="img-fluid" />
                </Media>
              </CardHeader>
              <div className="pmd-content-wrapper">
                <CardBody>
                  <CardText>
                    Deploy AI model is used for model deployment. This can be
                    cloud deployment or device-specific deployment.
                  </CardText>
                </CardBody>
                <CardFooter className="d-flex justify-content-end">
                  <span className="btn pmd-btn-fab btn-sm pmd-ripple-effect">
                    <i className="material-icons pmd-xs">arrow_forward</i>
                  </span>
                </CardFooter>
              </div>
            </Link>
          </Col>

          <Col lg="4" md="6" className="d-flex">
            {/* View History */}
            <Link
              className="card pmd-card pmd-content-equal pmd-model-card pmd-card-history"
              to="history"
            >
              <CardHeader className="card-header pmd-card-dark d-flex flex-row mb-0">
                <Media body className="d-flex align-items-center">
                  <CardTitle tag="h3">View History</CardTitle>
                </Media>
                <Media
                  right
                  middle
                  className="pmd-icon-circle pmd-icon-md pmd-model-icon"
                >
                  <img src={historyImg} alt="Icon" className="img-fluid" />
                </Media>
              </CardHeader>
              <div className="pmd-content-wrapper">
                <CardBody>
                  <CardText>
                    View history/records of your secured data based AI model.
                  </CardText>
                </CardBody>
                <CardFooter className="d-flex justify-content-end">
                  <span className="btn pmd-btn-fab btn-sm pmd-ripple-effect">
                    <i className="material-icons pmd-xs">arrow_forward</i>
                  </span>
                </CardFooter>
              </div>
            </Link>
          </Col>

          <Col lg="4" md="6" className="d-flex">
            {/* Tag */}
            <Link
              className="card pmd-card pmd-content-equal pmd-model-card pmd-card-tags"
              to="/tag"
            >
              <CardHeader className="card-header pmd-card-dark d-flex flex-row mb-0">
                <Media body className="d-flex align-items-center">
                  <CardTitle tag="h3">Tag</CardTitle>
                </Media>
                <Media
                  right
                  middle
                  className="pmd-icon-circle pmd-icon-md pmd-model-icon"
                >
                  <img src={tags} alt="Icon" className="img-fluid" />
                </Media>
              </CardHeader>
              <div className="pmd-content-wrapper">
                <CardBody>
                  <CardText>
                    Tag is used for tagging AI/ML model that is generated or
                    imported. You can define multiple custom tags for AI/ML
                    model.
                  </CardText>
                </CardBody>
                <CardFooter className="d-flex justify-content-end">
                  <span className="btn pmd-btn-fab btn-sm pmd-ripple-effect">
                    <i className="material-icons pmd-xs">arrow_forward</i>
                  </span>
                </CardFooter>
              </div>
            </Link>
          </Col>

          <Col lg="4" md="6" className="d-flex">
            {/* Tag and submit */}
            <Link
              className="card pmd-card pmd-content-equal pmd-model-card pmd-card-tagsubmit"
              to="/submit-tag"
            >
              <CardHeader className="card-header pmd-card-dark d-flex flex-row mb-0">
                <Media body className="d-flex align-items-center">
                  <CardTitle tag="h3">Tag and submit</CardTitle>
                </Media>
                <Media
                  right
                  middle
                  className="pmd-icon-circle pmd-icon-md pmd-model-icon"
                >
                  <img src={tagSubmit} alt="Icon" className="img-fluid" />
                </Media>
              </CardHeader>
              <div className="pmd-content-wrapper">
                <CardBody>
                  <CardText>
                    Tag and submit are used to submit the model to be used
                    within enterprise or make it open source via QPiAI platform.
                  </CardText>
                </CardBody>
                <CardFooter className="d-flex justify-content-end">
                  <span className="btn pmd-btn-fab btn-sm pmd-ripple-effect">
                    <i className="material-icons pmd-xs">arrow_forward</i>
                  </span>
                </CardFooter>
              </div>
            </Link>
          </Col>

          <Col lg="4" md="6" className="d-flex">
            {/* Data prep */}
            <Link
              className="card pmd-card pmd-content-equal pmd-model-card pmd-card-dataprep"
              to="/data-prep"
            >
              <CardHeader className="card-header pmd-card-dark d-flex flex-row mb-0">
                <Media body className="d-flex align-items-center">
                  <CardTitle tag="h3">Data Prep</CardTitle>
                </Media>
                <Media
                  right
                  middle
                  className="pmd-icon-circle pmd-icon-md pmd-model-icon"
                >
                  <img src={dataPrep} alt="Icon" className="img-fluid" />
                </Media>
              </CardHeader>
              <div className="pmd-content-wrapper">
                <CardBody>
                  <CardText>
                    Data prep is for annotating the raw data, cleansing raw data
                    and preparing it for usage in AI/ML model generation.
                  </CardText>
                </CardBody>
                <CardFooter className="d-flex justify-content-end">
                  <span className="btn pmd-btn-fab btn-sm pmd-ripple-effect">
                    <i className="material-icons pmd-xs">arrow_forward</i>
                  </span>
                </CardFooter>
              </div>
            </Link>
          </Col>
        
          <Col lg="4" md="6" className="d-flex">
               {/* Data annotation */}
              <Link
                className="card pmd-card pmd-content-equal pmd-model-card pmd-card-dataprep"
                to="/data-annotation"
              >
                <CardHeader className="card-header pmd-card-dark d-flex flex-row mb-0">
                  <Media body className="d-flex align-items-center">
                    <CardTitle tag="h3">Data Annotation</CardTitle>
                  </Media>
                  <Media
                    right
                    middle
                    className="pmd-icon-circle pmd-icon-md pmd-model-icon"
                  >
                    <img src={dataPrep} alt="Icon" className="img-fluid" />
                  </Media>
                </CardHeader>
                <div className="pmd-content-wrapper">
                  <CardBody>
                    <CardText>
                      Data Annotation for the Image
                    </CardText>
                  </CardBody>
                  <CardFooter className="d-flex justify-content-end">
                    <span className="btn pmd-btn-fab btn-sm pmd-ripple-effect">
                      <i className="material-icons pmd-xs">arrow_forward</i>
                    </span>
                  </CardFooter>
                </div>
              </Link>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export { ModelCardWidgets };
