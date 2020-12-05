import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { alertActions, userActions } from '../_actions'
import { submitFailure } from '../_utils/submitFailure'
import { Form, Button, CustomInput, CardBody, NavLink } from 'reactstrap'
import { userService } from '../_services'

const validate = values => {
  const errors = {}
  return errors
}

class RegisterPage extends React.Component {
  constructor(props) {
    super(props)

    // reset login status
    this.props.dispatch(userActions.logout())

    this.state = {
      email: '',
      password: '',
      mobile: '',
      name: '',
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  async handleSubmit(e) {
    e.preventDefault()

    this.setState({ submitted: true })
    const { name, email, password } = this.state
    const response = await userService.register(name, email, password)
    const { id } = response
    if (id) {
      this.props.dispatch(
        alertActions.success('USER REGISTERED SUCCESSFULLY! PLEASE LOGIN ')
      )
    } else {
      this.props.dispatch(alertActions.error('EMAIL ALREADY REGISTERED!'))
    }
  }

  render() {
    const { email, password, mobile, submitted, name } = this.state
    return (
      <React.Fragment>
        <div>
          <Form
            name="Loginform"
            className="frm-login"
            id="Loginform"
            onSubmit={this.handleSubmit}
          >
            <CardBody>
              <h2 className="card-title">Register to Account</h2>
              <div
                className={
                  'form-group' + (submitted && !email ? ' text-danger' : '')
                }
              >
                <label htmlFor="email">Name</label>

                <input
                  type="text"
                  className={
                    'form-control' + (submitted && !email ? ' is-invalid' : '')
                  }
                  id="name"
                  name="name"
                  value={name}
                  onChange={this.handleChange}
                />
                {submitted && !email && (
                  <div className="invalid-feedback">Name is required</div>
                )}
              </div>
              <div
                className={
                  'form-group' + (submitted && !email ? ' text-danger' : '')
                }
              >
                <label htmlFor="email">Email Address</label>

                <input
                  type="text"
                  className={
                    'form-control' + (submitted && !email ? ' is-invalid' : '')
                  }
                  id="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
                {submitted && !email && (
                  <div className="invalid-feedback">Email is required</div>
                )}
              </div>
              <div
                className={
                  'form-group' + (submitted && !password ? ' text-danger' : '')
                }
              >
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  autoComplete="off"
                  className={
                    'form-control' +
                    (submitted && !password ? ' is-invalid' : '')
                  }
                  id="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                {submitted && !password && (
                  <div className="invalid-feedback">Password is required</div>
                )}
              </div>

              <div className="d-flex justify-content-between">
                <span className="pmd-checkbox mb-4" />
                <NavLink href="/login" className="p-0 text-right">
                  Back to Login
                </NavLink>
              </div>

              <Button
                color="primary"
                className="w-100 pmd-btn-raised mb-3 pmd-ripple-effect align-items-center d-inline-flex justify-content-center"
              >
                Register{' '}
                <i className="material-icons md-light pmd-icon-sm ml-2 mr-0">
                  arrow_right_alt
                </i>
              </Button>
            </CardBody>
          </Form>
        </div>
      </React.Fragment>
    )
  }
}

const fieldList = [`email`, `password`, `mobile`]

RegisterPage = reduxForm({
  form: 'syncValidation',
  validate,
  enableReinitialize: true,
  onSubmitFail: submitFailure(fieldList)
})(RegisterPage)

function mapStateToProps(state) {
  const { loggingIn } = state.authentication
  return {
    loggingIn
  }
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage)
export { connectedRegisterPage as RegisterPage }
