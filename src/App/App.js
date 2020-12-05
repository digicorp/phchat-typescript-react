import React from 'react'
import { connect } from 'react-redux'
import { Router, BrowserRouter, Switch } from 'react-router-dom'

import '../../public/scss/app.scss'
import { history } from '../_helpers'
import { alertActions } from '../_actions'
import { ToastContainer, toast } from 'react-toastify'

import {
  GAListener,
  LoginRoute,
  PrivateRoute,
  MainLayout,
  LoginLayout,
  RegisterLayout,
  NotFound
} from '../_components'

import { LoginPage } from '../LoginPage'
import { RegisterPage } from '../RegisterPage'
import { Welcome } from '../Welcome'

const CloseButton = ({ closeToast }) => (
  <button onClick={closeToast} className="Toastify__close-button">
    <i className="material-icons pmd-xs">close</i>
  </button>
)

class App extends React.Component {
  autoCloseTimer = 2000
  constructor(props) {
    super(props)
    this.state = {}
    this.notify = this.notify.bind(this)
    const { dispatch } = this.props
    history.listen((location, action) => {
      // clear alert on location change
      dispatch(alertActions.clear())
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    //Prevent Dupulicate Error Toast.
    toast.dismiss()
    if (
      !!nextProps.alert &&
      !!nextProps.alert.type &&
      nextProps.alert.message
    ) {
      this.notify(nextProps.alert.type, nextProps.alert.message)
    }
  }

  notify(alert_type, alert_message) {
    console.log('alert_message :>> ', alert_message)
    if (alert_type === 'alert-success') {
      toast.success(alert_message)
    } else if (alert_type === 'alert-danger') {
      toast.error(alert_message)
    } else if (alert_type === 'alert-warn') {
      toast.warn(alert_message)
    }
  }

  render() {
    return (
      <div>
        {/* Toast message*/}
        <ToastContainer
          className="pmd-toast-group"
          hideProgressBar={true}
          autoClose={this.autoCloseTimer}
          closeButton={<CloseButton />}
        />

        {/*END Toast message*/}
        <BrowserRouter>
          <GAListener>
            <Router history={history}>
              <div>
                <Switch>
                  {/* Login Route */}
                  <LoginRoute
                    exact
                    path="/login"
                    layout={LoginLayout}
                    component={LoginPage}
                  />
                  <LoginRoute
                    exact
                    path="/register"
                    layout={RegisterLayout}
                    component={RegisterPage}
                  />
                  {/* Private Route */}
                  <PrivateRoute
                    exact
                    path="/"
                    layout={MainLayout}
                    component={Welcome}
                  />

                  {/* 404 Not Found */}
                  <PrivateRoute
                    path="*"
                    layout={MainLayout}
                    component={NotFound}
                  />
                </Switch>
              </div>
            </Router>
          </GAListener>
        </BrowserRouter>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { alert } = state
  return {
    alert
  }
}

const connectedApp = connect(mapStateToProps)(App)
export { connectedApp as App }
