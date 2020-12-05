import config from 'config'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Container,
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  Button
} from 'reactstrap'

import desktop from '../../../public/assets/img/page/model-generate-animation-desktop.gif'
import mobile from '../../../public/assets/img/page/model-generate-animation-mobile.gif'

class ModelSocketProcess extends React.Component {
  // modelProcess = "";
  user = JSON.parse(localStorage.getItem('user'))
  pythonSocket = io(`${config.SOCKETURL}?token=${this.user.token}`, {
    path: '/python'
  })
  constructor(props) {
    super(props)
    this.state = {
      user_id: '',
      modelProcess: '',
      isShowCheckpointS3URL: false
    }
  }

  UNSAFE_componentWillMount() {
    let user = JSON.parse(localStorage.getItem('user'))
    if (!!user && user.id) {
      this.setState({ user_id: user.id })
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)

    const bucketUrl = localStorage.getItem('bucketUrl') || ''
    if (bucketUrl && bucketUrl.length > 0) {
      this.setState({ checkpoints3URL: bucketUrl })
    }
  }

  openURL = () => {
    const { checkpoints3URL } = this.state
    window.open(checkpoints3URL, '_blank')
  }

  render() {
    let { modelProcess = '', checkpoints3URL } = this.state
    console.log('modelProcess :>> ', modelProcess)
    if (!!checkpoints3URL) console.log('checkpoints3URL :>> ', checkpoints3URL)

    return (
      <React.Fragment>
        <Container>
          {/****** Step : Retrieve generated model data ******/}
          <div>
            {/* Step Title */}
            <div className="model-data-desc">
              {/* Generate model socket status */}
              <Card className="pmd-card pmd-card-transparent">
                <CardHeader>
                  <CardTitle tag="h2" className="h1">
                    {!!checkpoints3URL ? `Download` : `Preparing`} AI model
                  </CardTitle>
                </CardHeader>

                {!!checkpoints3URL && (
                  <p className="">
                    * Copy the generated link and download the parameters
                  </p>
                )}

                <ul className="list-group pmd-list ">
                  <li className="list-group-item d-flex align-items-center justify-content-center">
                    <div className="mb-0">
                      {/* process */}
                      <p>{checkpoints3URL}</p>
                      {!!checkpoints3URL && (
                        <p>
                          <Button
                            color="primary"
                            size="sm"
                            onClick={this.openURL}
                          >
                            Download
                          </Button>
                        </p>
                      )}
                      {/* END process */}
                    </div>
                  </li>
                </ul>

                <p className="">
                  Please wait, this process might take time to complete.
                  Meanwhile, you can continue exploring the tool.
                </p>
                <CardFooter>
                  <Link
                    color="dark"
                    className="btn btn-link pmd-ripple-effect btn-dark"
                    to="/dashboard"
                  >
                    Go to Dashboard
                  </Link>
                </CardFooter>
              </Card>
              {!checkpoints3URL && (
                <div className="animate-progress-image">
                  <img
                    src={desktop}
                    className="img-fluid d-none d-md-inline-flex"
                    alt="Image"
                  />
                  <img
                    src={mobile}
                    className="img-fluid d-inline-block d-md-none"
                    alt="Image"
                  />
                </div>
              )}
            </div>
          </div>
          {/****** End Step : Retrieve generated model data ******/}
        </Container>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

const connectedModelSocketProcess = connect(mapStateToProps)(ModelSocketProcess)
export { connectedModelSocketProcess as ModelSocketProcess }
