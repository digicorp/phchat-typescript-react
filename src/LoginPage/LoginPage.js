import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { userActions } from '../_actions'
import { submitFailure } from '../_utils/submitFailure'
import { Form, Button, CustomInput, CardBody, NavLink } from 'reactstrap'

const validate = values => {
  const errors = {}
  return errors
}

class LoginPage extends React.Component {
  constructor(props) {
    super(props)

    // reset login status
    this.props.dispatch(userActions.logout())

    this.state = {
      email: '',
      password: '',
      submitted: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault()

    this.setState({ submitted: true })
    const { email, password } = this.state

    const { dispatch } = this.props
    if (email && password) {
      dispatch(userActions.login(email, password))
    }
  }

  render() {
    const { loggingIn } = this.props
    const { email, password, submitted } = this.state
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
              <h2 className="card-title">Login to Account</h2>
              <p className="mb-4">
                Enter email and password to access your account
              </p>

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
                <CustomInput
                  className="pmd-checkbox mb-4"
                  type="checkbox"
                  id="exampleCustomCheckbox"
                  label="Remember Me"
                />
                <NavLink href="/register" className="p-0">
                  Register
                </NavLink>
              </div>
              <Button
                color="primary"
                className="w-100 pmd-btn-raised mb-3 pmd-ripple-effect align-items-center d-inline-flex justify-content-center"
              >
                Login{' '}
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

const fieldList = [`email`, `password`]

LoginPage = reduxForm({
  form: 'syncValidation',
  validate,
  enableReinitialize: true,
  onSubmitFail: submitFailure(fieldList)
})(LoginPage)

function mapStateToProps(state) {
  const { loggingIn } = state.authentication
  return {
    loggingIn
  }
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage)
export { connectedLoginPage as LoginPage }
