import React from 'react'
import { connect } from 'react-redux'

import { Container, Col, Row, CardBody, Card } from 'reactstrap'

import { AvInput, AvForm, AvGroup } from 'availity-reactstrap-validation'

import { DoaminSubDomainMultiSelectlist } from '../_components/Lists'
import { userService } from '../_services'

class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userId: null,
      user: null
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    let user = localStorage.getItem('user')
    if (typeof user === 'string') {
      user = JSON.parse(user)
    }
    const { id: userId = '' } = user
    this.setState({ userId })
  }

  handleSearchModelChange = (name, value) => {
    const { user } = this.state

    this.setState({
      user: {
        ...user,
        [name]: value
      }
    })
  }

  handleChange = (event) => {
    const { name, value } = event.target
    const { user } = this.state

    this.setState({
      user: {
        ...user,
        [name]: value
      }
    })
  }

  onKeyDownHandler = async (e) => {
    if (e.keyCode === 13) {
      console.log('enter :>> ')
      const { userId } = this.state
      const other_data = { id: userId }
      let { user } = this.state
      user = { ...other_data, ...user }
      const response = await userService.sendMessage(user)

      const { id } = response
      if (id) {
        console.log('response :>> ', response)
      }
      this.myFormRef.reset()
    }
  }

  render() {
    const { user } = this.state

    return (
      <React.Fragment>
        <Container>
          <AvForm
            onKeyDown={this.onKeyDownHandler}
            ref={(el) => (this.myFormRef = el)}
          >
            <Row className="justify-content-center">
              <Col md="12">
                <Card className="pmd-card no-hover-shadow">
                  <CardBody>
                    {/* AI Model Parameters  */}
                    <div className="form-section">
                      <AvGroup>
                        <Row>
                          <DoaminSubDomainMultiSelectlist
                            onDomainSubDomainChange={
                              this.handleSearchModelChange
                            }
                          />
                        </Row>
                      </AvGroup>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
              {!!user && (
                <AvInput
                  name="message"
                  required
                  placeholder="Write your message"
                  onChange={this.handleChange}
                />
              )}
            </div>

            {/****** End Step 3 : Upload data files ******/}
          </AvForm>
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
