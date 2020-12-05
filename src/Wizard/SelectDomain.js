import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Container,
  Col,
  Row,
  Label,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CustomInput
} from 'reactstrap'

class SelectDomain extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      domain: '',
      subDomain: '',
      subdomain_structure: []
    }

    this.onDomainChanged = this.onDomainChanged.bind(this)
    this.onNextStrep = this.onNextStrep.bind(this)
    this.toggleDomainAddNew = this.toggleDomainAddNew.bind(this)
  }

  UNSAFE_componentWillMount() {
    const domain = localStorage.getItem('domain')
    const sub_domain = localStorage.getItem('sub_domain')
    if (!!domain && domain !== undefined && domain !== null) {
      this.setState({ domain: domain })
    }
    if (!!sub_domain && sub_domain !== undefined && sub_domain !== null)
      this.setState({
        subDomain: sub_domain
      })
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  onDomainChanged(event) {
    const { checked } = event.target
    const domain = event.target.value
    const domainName = event.currentTarget.getAttribute('data-domain_name')

    this.setState({ domain }, () => {
      localStorage.setItem('domain', domain)
      localStorage.setItem('domain_name', domainName)
      localStorage.setItem('sub_domain', '')
      localStorage.setItem('sub_domain_name', '')
      this.onNextStrep()
    })

    if (!!checked) {
      document
        .querySelectorAll('#domain label')
        .forEach((element) => element.classList.remove('card-selected-item'))
      event.target.parentNode.parentNode.parentNode.classList.add(
        'card-selected-item'
      )
    }
  }

  onNextStrep(event) {
    this.props.onUpdateStep(2)
  }

  toggleDomainAddNew() {
    this.setState({
      modalAddNew: !this.state.modalAddNew
    })
  }

  render() {
    const domainList = !!this.props.domain_list ? this.props.domain_list : []
    const domain_structure = []
    // const domainList = Object.keys(commonConstants.Domains);
    if (Array.isArray(domainList) && domainList.length > 0) {
      domainList.forEach((element, index) => {
        return domain_structure.push(
          <Col key={index} lg="4" md="6" className="d-flex">
            {/* Add "card-selected-item" for check */}
            <Label
              className={`card pmd-card w-100 text-center pmd-radio-card ${
                parseInt(this.state.domain) === parseInt(element.id)
                  ? ' card-selected-item'
                  : ''
              }`}
              for={element.id.toString()}
            >
              <CardBody>
                <CustomInput
                  data-domain_name={element.name}
                  value={element.id}
                  checked={parseInt(this.state.domain) === parseInt(element.id)}
                  onChange={this.onDomainChanged}
                  onClick={this.onDomainChanged}
                  className="pmd-radio domain-radio"
                  type="radio"
                  label=""
                  name="domainSelection"
                  id={element.id.toString()}
                />
                <div className="pmd-card-icon">
                  <i className="md-light pmd-icon-circle bg-secondary-light pmd-icon-md">
                    <img
                      src={!!element.image ? element.image : ''}
                      alt={element.name}
                      className="img-fluid"
                    />
                  </i>
                </div>
                <CardTitle tag="h3">{element.name}</CardTitle>
                <CardText>{element.description}</CardText>
              </CardBody>
            </Label>
          </Col>
        )
      })
    }

    return (
      <React.Fragment>
        <Container>
          {/****** Step 1 : Domain and Sub-domain Selection ******/}
          <div className="step1-body">
            {/* Domain Select */}
            <Row className="mb-50 justify-content-center">
              <Col xl="8" lg="10" className="text-center">
                <h1 className="mb-0 mt-lg-4">Select domain</h1>
                <p className="mb-0 lead">
                  Choose the domain platform that you are operating in
                </p>
              </Col>
            </Row>
            <Row className="mb-50" id="domain">
              {/* Add new */}
              <Col lg="4" md="6" className="d-flex">
                <Link
                  to="/domain"
                  className="card pmd-card w-100 text-center pmd-add-new"
                >
                  <CardBody>
                    <div className="pmd-card-icon">
                      <i className="md-dark pmd-icon-circle bg-secondary-light pmd-icon-md material-icons">
                        add
                      </i>
                    </div>
                    <CardTitle tag="h3">Manage Domain</CardTitle>
                    <CardText>
                      Manage your custom domain for AI model generation and
                      deployment
                    </CardText>
                  </CardBody>
                </Link>
              </Col>
              {/* domain */}
              {domain_structure}
              {/* End domain */}
            </Row>
            {/* End Domain Select */}

            {/* Sub-domain Select */}
            {!!this.state.subdomain_structure.length && (
              <Row className="mb-50" id="subdomain">
                <Col md="12" className="mx-auto text-center">
                  <div className="mb-4">
                    <h2 className="h1">Select sub-domain</h2>
                    <p className="mb-0">
                      Choose a sub-domain to get started model
                    </p>
                  </div>
                </Col>
                {/* Add new */}
                <Col lg="4" md="6" className="d-flex">
                  <Card
                    className="card pmd-card w-100 text-center pmd-add-new"
                    onClick={this.toggleDomainAddNew}
                  >
                    <CardBody className="d-flex align-items-center">
                      <div className="mr-3">
                        <i className="md-dark pmd-icon-circle bg-gray pmd-icon-xs material-icons">
                          add
                        </i>
                      </div>
                      <CardText className="font-weight-bold">
                        Add Sub-domain
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
                {/* sub-domain */}
                {this.state.subdomain_structure}
                {/* end sub-domain */}
              </Row>
            )}
            {/* End Sub-domain Select */}

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
        </Container>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

const connectedSelectDomain = connect(mapStateToProps)(SelectDomain)
export { connectedSelectDomain as SelectDomain }
