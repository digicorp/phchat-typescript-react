import React from 'react'
import { connect } from 'react-redux'
import { Container } from 'reactstrap'
import { SelectDomain } from './SelectDomain'
import { SelectSubDomain } from './SelectSubDomain'
import { SelectBaseModel } from './SelectBaseModel'
import { GenerateAIModel } from './GenerateAIModel'
import { ModelResponse } from './ModelResponse'

import { alphapiActions, domainActions } from '../_actions'

class WizardStepper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      step: 1,
      is_stepper: false
    }

    this.updateSteps = this.updateSteps.bind(this)
    this.goToStepper = this.goToStepper.bind(this)
  }

  UNSAFE_componentWillMount() {
    const { dispatch } = this.props
    // @api to get basemodel and domain list
    dispatch(alphapiActions.listBaseModel())
    dispatch(domainActions.listDomain())
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    let is_stepper =
      !!this.props.match && this.props.match.path === '/wizard-stepper'
        ? true
        : false

    this.setState({ is_stepper: is_stepper })
  }

  updateSteps(newStep) {
    this.setState({ step: newStep })
  }

  goToStepper(e, step) {
    e.stopPropagation()
    const className = e.currentTarget.className
    if (!!className && className.indexOf('completed') !== -1) {
      this.setState({ step: step })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          {/* Stepper */}
          <ul className="nav pmd-stepper pmd-stepper-bottom-label ai-steppper mb-4 ">
            {/* "completed" class for complete step, "active" class for active step */}
            <li
              onClick={(e) => {
                this.goToStepper(e, 1)
              }}
              className={
                this.state.step === 1
                  ? 'nav-item step1 active'
                  : this.state.step > 1
                  ? 'nav-item step1 active completed'
                  : 'nav-item step1'
              }
            >
              <div className="pmd-stepper-item">
                <div className="pmd-stepper-media pmd-icon-circle pmd-icon-sm">
                  <span className="default-media">1</span>
                  <i className="material-icons completed-media">done</i>
                </div>
                <h3 className="pmd-stepper-title">Select Domain</h3>
              </div>
            </li>
            {/* sub domain */}
            <li
              onClick={(e) => {
                this.goToStepper(e, 2)
              }}
              className={
                this.state.step === 2
                  ? 'nav-item step2 active'
                  : this.state.step > 2
                  ? 'nav-item step2 active completed'
                  : 'nav-item step2'
              }
            >
              <div className="pmd-stepper-item">
                <div className="pmd-stepper-media pmd-icon-circle pmd-icon-sm">
                  <span className="default-media">2</span>
                  <i className="material-icons completed-media">done</i>
                </div>
                <h3 className="pmd-stepper-title">Select Sub-domain</h3>
              </div>
            </li>
            {/* base model */}
            <li
              onClick={(e) => {
                this.goToStepper(e, 3)
              }}
              className={
                this.state.step === 3
                  ? 'nav-item step2 active'
                  : this.state.step > 3
                  ? 'nav-item step2 active completed'
                  : 'nav-item step2'
              }
            >
              <div className="pmd-stepper-item">
                <div className="pmd-stepper-media pmd-icon-circle pmd-icon-sm">
                  <span className="default-media">3</span>
                  <i className="material-icons completed-media">done</i>
                </div>
                <h3 className="pmd-stepper-title">Choose Base Model</h3>
              </div>
            </li>
            {/* generate model */}
            <li
              onClick={(e) => {
                this.goToStepper(e, 4)
              }}
              className={
                this.state.step === 4
                  ? 'nav-item step3 active'
                  : this.state.step > 4
                  ? 'nav-item step3 active completed'
                  : 'nav-item step3'
              }
            >
              <div className="pmd-stepper-item">
                <div className="pmd-stepper-media pmd-icon-circle pmd-icon-sm">
                  <span className="default-media">4</span>
                  <i className="material-icons completed-media">done</i>
                </div>
                <h3 className="pmd-stepper-title">Generate Model</h3>
              </div>
            </li>
            {/* retrieve generated model data */}
            <li className="nav-item step4">
              <div className="pmd-stepper-item">
                <div className="pmd-stepper-media pmd-icon-circle pmd-icon-sm">
                  <span className="default-media">5</span>
                  <i className="material-icons completed-media">done</i>
                </div>
                <h3 className="pmd-stepper-title">Retrieve Model Data</h3>
              </div>
            </li>
          </ul>
          {/* End Stepper */}
        </Container>

        {/****** Step 1 : Domain and Sub-domain Selection ******/}
        {this.state.step === 1 && (
          <SelectDomain
            onUpdateStep={this.updateSteps}
            domain_list={!!this.props.domain_list ? this.props.domain_list : []}
          ></SelectDomain>
        )}
        {/****** End Step 1 : Domain and Sub-domain Selection ******/}

        {/****** Step 2 : sub Domain and Sub-domain Selection ******/}
        {this.state.step === 2 && (
          <SelectSubDomain
            onUpdateStep={this.updateSteps}
            subdomain_list={
              !!this.props.subdomain_list ? this.props.subdomain_list : []
            }
          ></SelectSubDomain>
        )}
        {/****** End Step 2 : sub Domain and Sub-domain Selection ******/}

        {/****** Step 3 : Model Selection ******/}
        {this.state.step === 3 && (
          <SelectBaseModel onUpdateStep={this.updateSteps}></SelectBaseModel>
        )}
        {/****** End Step 3 : Model Selection ******/}

        {/****** Step 4 : Generate Model ******/}
        {this.state.step === 4 && (
          <GenerateAIModel
            onUpdateStep={this.updateSteps}
            is_stepper={this.state.is_stepper}
          ></GenerateAIModel>
        )}
        {/****** End Step 4 : Generate Model ******/}

        {/****** Step 5 : Generated Model Status******/}
        {this.state.step === 5 && (
          <ModelResponse onUpdateStep={this.updateSteps}></ModelResponse>
        )}
        {/****** End Step 5 : Generated Model Status ******/}
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { model_list } = state.basemodel
  const { domain_list, subdomain_list } = state.domain
  return { model_list, domain_list, subdomain_list }
}

const connectedWizardStepper = connect(mapStateToProps)(WizardStepper)
export { connectedWizardStepper as WizardStepper }
