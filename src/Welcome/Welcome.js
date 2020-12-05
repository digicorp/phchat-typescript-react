import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap'

class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          <div class="container conversations">
            <div class="row">
              <section class="col-md-4 conversations-section">
                <ul class="user-list">
                  {/* List of users who wrote you or you wrote them. */}
                  <li class="user-who-wrote-you">
                    <a
                      href="#"
                      data-id="'.$single_username['id'].'"
                      class="user-list-item"
                    ></a>
                    <img
                      src="assets/avatars/profile-'.$single_username['id'].'.jpg"
                      alt="'.$username.'\'s avatar"
                      class="rounded-img header-img"
                    />
                    <span class="messager-name">vinit</span>
                  </li>
                </ul>
                {/* Search user */}
                <div class="search-user">
                  <div class="list-group list-results"></div>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

const connectedWelcome = connect(mapStateToProps)(Welcome)
export { connectedWelcome as Welcome }
