import React from 'react'
import { connect } from 'react-redux'
import { Row, Col, Nav, NavItem, NavLink, Container } from 'reactstrap'
import { Link } from 'react-router-dom'

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    //theme-inverse only in onboardin flow...
    return (
      <React.Fragment>
        {/* Footer */}
        <footer className="pmd-footer footer-bottom-absolute">
          <Container>
            <div className="footer-section d-md-flex align-items-center justify-content-md-between">
              <div className="pmd-site-info text-center text-md-left mb-md-0 mb-2">
                © <span className="auto-update-year"></span> 2020{' '}
                <strong>digi-corp phChat.</strong>
              </div>
              <Nav
                className="pmd-footer-nav pmd-footer-nav-divider justify-content-md-end justify-content-center m-0"
                navbar
              ></Nav>
            </div>
          </Container>
        </footer>
        {/* End Footer */}
      </React.Fragment>
    )
  }
}
function mapStateToProps(state) {
  //const { registering } = state.registration;
  return {
    //registering
  }
}
const connectedFooter = connect(mapStateToProps)(Footer)
export { connectedFooter as Footer }
