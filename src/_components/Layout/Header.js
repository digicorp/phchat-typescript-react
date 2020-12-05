import React from 'react'
import { connect } from 'react-redux'
import { Avatar } from '../../_components/Avatar'

import {
  Navbar,
  Container,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledButtonDropdown
} from 'reactstrap'

import { Link } from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      redirect: false,
      user: { searchkeyword: '' },
      search_text: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (!!user && user.name) {
      this.setState({ name: `${user.name}` })
    }
  }

  //#region Search functions
  handleChange = async event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
      redirect: false
    })
  }
  //#endregion

  render() {
    return (
      <React.Fragment>
        <Navbar
          dark
          expand="lx"
          className="fixed-top bg-dark pmd-navbar pmd-z-depth-light-1"
        >
          <Container>
            <Link className="navbar-brand" to="/welcome">
              PH Chat | {this.state.name}
            </Link>
            <div className="pmd-navbar-right-icon ml-auto d-flex align-items-center navbar-right">
              {/* User Menu dropdown */}
              <UncontrolledButtonDropdown className="nav-item pmd-user-info">
                <DropdownToggle tag="a" className="btn btn-sm pmd-btn-flat">
                  <div className="media align-items-center">
                    <div className="media-right">
                      <Avatar className="ml-md-3" />
                    </div>
                  </div>
                </DropdownToggle>
                <DropdownMenu right className="user-profile-dropdown">
                  <DropdownItem tag="a" href="/login">
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
            </div>
          </Container>
        </Navbar>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  let default_search_keyword = ''
  return {
    default_search_keyword
  }
}
const connectedHeader = connect(mapStateToProps)(Header)
export { connectedHeader as Header }
