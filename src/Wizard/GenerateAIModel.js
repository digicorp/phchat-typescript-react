import config from 'config'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { commonConstants } from '../_constants'

import {
  Container,
  Col,
  Row,
  InputGroup,
  InputGroupAddon,
  Media,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  FormGroup,
  Label,
  Input,
  Progress,
  CardBody,
  Card,
  Spinner
} from 'reactstrap'

import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback
} from 'availity-reactstrap-validation'
import AvSelect from '@availity/reactstrap-validation-select'

import { history } from '../_helpers'
import { alertActions, tagsActions } from '../_actions'
import { alphapiService } from '../_services'

import {
  DomainSubDomainList,
  BaseModelList,
  TargetDeviceList,
  DataTypeList,
  DoaminSubDomainMultiSelectlist
} from '../_components/Lists'

import audio from '../../public/assets/img/page/ic_audio.svg'
import uploadServer from '../../public/assets/img/page/ic_file-upload-white.svg'

class GenerateAIModel extends React.Component {
  fileuploadProgress = 0
  modelFileuploadProgress = 0
  _isMounted = false
  user = JSON.parse(localStorage.getItem('user'))
  uploadSocket = io(`${config.SOCKETURL}?token=${this.user.token}`, {
    path: '/uploads'
  })

  constructor(props) {
    super(props)

    this.state = {
      apiType: 'modelgen',
      isGenerateModelPage: true,
      user: {},
      searchModel: null,
      fields: {},
      file: '',
      modelFile: '',
      user_id: '',
      domain: '',
      subDomain: '',
      isTargetColumnVisible: false,
      baseModelSelected: null,
      targetDeviceSelected: null,
      submitted: false,
      isUploadedDataset: false,
      isUploadedModelset: false,
      fileuploadProgress: 0,
      modelFileuploadProgress: 0,
      uploaded: false,
      modelUploaded: false,
      isFileuploaded: false,
      isModelFileuploaded: false
    }

    this.onNextStrep = this.onNextStrep.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
    this.uploadModelFile = this.uploadModelFile.bind(this)
    this.clearImage = this.clearImage.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleOptionsChange = this.handleOptionsChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  UNSAFE_componentWillMount() {
    const domain = localStorage.getItem('domain')
    const sub_domain = localStorage.getItem('sub_domain')
    if (!!domain && domain !== undefined && domain !== null) {
      this.setState({ domain })
    }
    if (!!sub_domain && sub_domain !== undefined && sub_domain !== null)
      this.setState({
        subDomain: sub_domain
      })

    let user = JSON.parse(localStorage.getItem('user'))
    if (!!user && user.id) {
      this.setState({ user_id: user.id })
    }

  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this._isMounted = true
    this.uploadSocket.on(`uploadProgress/${this.state.user_id}`, data => {
      this.fileuploadProgress = data.progress
    })
    this.uploadSocket.on(`modelUploadProgress/${this.state.user_id}`, data => {
      this.modelFileuploadProgress = data.progress
    })
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  onNextStrep() {
    if (!!this.props && !!this.props.onUpdateStep) this.props.onUpdateStep(5)
  }

  handlePerformanceChange = (name, value) => {
    const { user } = this.state
    const task = commonConstants.performanceMeasureTask[value]
    const metric = commonConstants.performanceMetric[value]
    const other_state = {
      performance_task: task,
      performance_metric: metric
    }
    this.setState({
      user: {
        ...user,
        ...other_state
      }
    })
  }

  handleOptionsChange(name, value) {
    const { user } = this.state
    let other_state = {
      id: !!this.state.fields.id ? this.state.fields.id : ''
    }

    if (this._isMounted) {
      if (value === 'tab') this.setState({ isTargetColumnVisible: true })
      else this.setState({ isTargetColumnVisible: false })
    }

    this.setState({
      user: {
        ...user,
        [name]: value,
        ...other_state
      }
    })
  }

  handleChange(event) {
    const { user } = this.state
    const { name, value, files, checked } = event.target
    if (name === 'isUploadedDataset') {
      this.setState({ isUploadedDataset: checked })
    } else if (name === 'isUploadedModelset') {
      this.setState({ isUploadedModelset: checked })
    } else if (!!files && files.length > 0) {
      this.setState({ [name]: files[0] })
    } else {
      this.setState({
        user: {
          ...user,
          [name]: value
        }
      })
    }
  }

  async uploadFile(e) {
    e.preventDefault()
    this.setState({ uploaded: true })

    const formData = new FormData()
    formData.append('file', this.state.file)
    formData.append('domain', this.state.domain)
    formData.append('subdomain', this.state.subDomain)
    const response = await alphapiService.uploadFile(formData)

    const { user } = this.state
    if (!!response.status) {
      this.setState({
        isFileuploaded: true,
        user: {
          ...user,
          dataset: response.data[0].file_path
        }
      })
      this.props.dispatch(alertActions.success(response.message))
      return true
    } else {
      this.setState({
        isFileuploaded: false,
        uploaded: false,
        user: {
          ...user,
          dataset: ''
        }
      })
      this.props.dispatch(alertActions.error(response))
      return false
    }
  }

  async uploadModelFile(e) {
    e.preventDefault()
    this.setState({ uploaded: true })

    const formData = new FormData()
    formData.append('modelFile', this.state.file)
    formData.append('domain', this.state.domain)
    formData.append('subdomain', this.state.subDomain)
    const response = await alphapiService.uploadFile(formData)

    const { user } = this.state
    if (!!response.status) {
      this.setState({
        isModelFileuploaded: true,
        user: {
          ...user,
          dataset: response.data[0].file_path
        }
      })
      this.props.dispatch(alertActions.success(response.message))
      return true
    } else {
      this.setState({
        isModelFileuploaded: false,
        modelUploaded: false,
        user: {
          ...user,
          dataset: ''
        }
      })
      this.props.dispatch(alertActions.error(response))
      return false
    }
  }

  clearImage() {
    this.setState({ file: '' })
  }

  clearModelImage = () => {
    this.setState({ modelFile: '' })
  }

  getModel = event => {
    let { searchModel } = this.state
    console.log('searchModel', searchModel)
    const other_state = { callType: 'getModel' }
    const { dispatch } = this.props
    if (searchModel) {
      searchModel = { ...searchModel, ...other_state }
      // @api to get basemodel
      console.log('searchModel...', searchModel)
      dispatch(tagsActions.getModels(searchModel))
    }
  }

  handleSearchModelChange = (name, value) => {
    const { searchModel } = this.state

    let domainSubDomain = []
    if (name === 'domainSubDomain') {
      if (!!value) {
        for (let i = 0; i < value.length; i++) {
          domainSubDomain.push(value[i].value)
        }
      }

      value = domainSubDomain
    }

    this.setState({
      searchModel: {
        ...searchModel,
        [name]: value
      }
    })
  }

  handleKeywordChange = event => {
    const { searchModel } = this.state
    const { name, value } = event.target

    this.setState({
      searchModel: {
        ...searchModel,
        [name]: value
      }
    })
  }

  async handleSubmit(event, errors) {
    localStorage.setItem('bucketUrl', '')
    event.persist()
    if (errors.length > 0) return false
    const uid = Math.random()
      .toString(36)
      .substring(7)
    this._isMounted = false
    this.setState({ submitted: true, room: uid })
    const { dispatch, is_stepper } = this.props
    let { user } = this.state

    if (!!user) {
      let other_state = {
        callType: 'modelgen',
        domain_id: this.state.domain,
        subdomain_id: this.state.subDomain,
        room: uid
      }
      user = { ...user, ...other_state }

      const formData = new FormData()
      formData.append('data', JSON.stringify(user))

      // @api to get basemodel and targetdevice list
      const response = await alphapiService.generateModel(formData)
      const { status, data: { bucketUrl = '' } = {} } = response
      this.setState({ submitted: false })
      if (status === true && bucketUrl.length > 0) {
        localStorage.setItem('bucketUrl', bucketUrl)
        // dispatch(alertActions.success(response.message))

        if (!!is_stepper) this.onNextStrep()
        else history.push('/model-process')
        return true
      } else {
        dispatch(alertActions.error(response))
        return false
      }
    }
  }

  render() {
    const { user } = this.state
    const { models_list, loading } = this.props

    // console.log("user..",user.hasOwnProperty('performance_metric'))
    // const dataType = Object.keys(commonConstants.dataType)
    // const final_data_type = []
    // if (!!dataType) {
    //   dataType.map((element) => {
    //     return final_data_type.push({
    //       label: commonConstants.dataType[element],
    //       value: element
    //     })
    //   })
    // }

    const modelType = Object.keys(commonConstants.modelType)
    const final_model_type = []
    if (!!modelType) {
      modelType.map(element => {
        return final_model_type.push({
          label: commonConstants.modelType[element],
          value: element
        })
      })
    }

    const performanceMetric = Object.keys(commonConstants.performanceMetric)
    const finalPerformanceMetric = []
    if (!!performanceMetric) {
      performanceMetric.map(element => {
        return finalPerformanceMetric.push({
          label: commonConstants.performanceMetric[element],
          value: element
        })
      })
    }

    /* const final_model_list = []
    if (!!models_list) {
      models_list.map((values) => {
        return final_model_list.push({
          label: `${values.fullname}`,
          value: values.name
        })
      })
    } */
    return (
      <React.Fragment>
        <Container>
          <AvForm onSubmit={this.handleSubmit}>
            {/****** Step 3 : Upload data files ******/}
            {!!this.props.is_stepper ? (
              <Row className="mb-50 justify-content-center">
                <Col xl="8" lg="10" className="text-center">
                  <h1 className="mb-0 mt-lg-4">Upload your data files</h1>
                  <p className="mb-0 lead">
                    Upload data files from your local system with drag and drop
                    feature
                  </p>
                </Col>
              </Row>
            ) : (
              <div className="page-title d-md-flex align-items-center justify-content-md-between">
                <h1 className="h2 mb-2 mb-md-0">Generate AI Model</h1>
                <Breadcrumb className="pmd-breadcrumbs">
                  <BreadcrumbItem>
                    <Link to="/">Dashboard</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>Generate AI Model</BreadcrumbItem>
                </Breadcrumb>
              </div>
            )}

            <Row className="justify-content-center">
              <Col md="12">
                <Card className="pmd-card no-hover-shadow">
                  <CardBody>
                    {/* Model Name */}
                    <div className="form-section pt-0">
                      <AvGroup>
                        <h3>
                          Model Name <span className="field-required">*</span>
                        </h3>
                        <p>
                          Enter a unique model name so this will help you while
                          searching for model data in the future
                        </p>
                        <Row>
                          <Col md={6}>
                            <AvInput
                              name="modelname"
                              id="modelname"
                              required
                              placeholder="Enter model name"
                              onChange={this.handleChange}
                            />
                            <AvFeedback>
                              Please enter a name of model!
                            </AvFeedback>
                          </Col>
                        </Row>
                      </AvGroup>
                    </div>

                    {/* File Upload  */}
                    <div className="form-section">
                      <Row>
                        <Col md={6}>
                          <AvGroup check>
                            <Label check>
                              <AvInput
                                type="checkbox"
                                name="isUploadedDataset"
                                onChange={this.handleChange}
                              />{' '}
                              Uploaded Data set
                            </Label>
                          </AvGroup>
                        </Col>
                      </Row>

                      {!this.state.isUploadedDataset && (
                        <Row>
                          <Col md={12}>
                            <h3>
                              Upload File{' '}
                              <span className="field-required">*</span>
                            </h3>
                            <p>
                              Select a file from your local computer or drag and
                              drop and click on <b>upload file</b> to upload on
                              server.
                            </p>
                            <small className="form-text text-muted mb-2">
                              Supported formats AVI, WMV, MOV, MP4, TXT, CSV,
                              TSV, PNG, JPG, GIF, MP3, or WAV.
                            </small>

                            <FormGroup>
                              <Input
                                type="file"
                                name="file"
                                id="generatefileUpload"
                                className="d-none"
                                onChange={this.handleChange}
                                required
                              />

                              {/* Add "custom-upload-error" class in label for error */}
                              <div className="custom-upload-wrap">
                                {!this.state.file ? (
                                  <Label
                                    className="custom-upload"
                                    for="generatefileUpload"
                                  >
                                    {/* Upload placholder text */}
                                    <span className="custom-upload-content">
                                      <b>Drag and drop</b> or{' '}
                                      <u className="custom-upload-browse">
                                        Browse
                                      </u>{' '}
                                      file to upload
                                    </span>
                                  </Label>
                                ) : (
                                  <div className="uploaded-file-list">
                                    <Media className="uploaded-file-item">
                                      <Media
                                        left
                                        className="pmd-avatar-list-img"
                                      >
                                        <Media
                                          object
                                          src={audio}
                                          alt="uploaded Image"
                                          className="img-fluid"
                                        />
                                      </Media>

                                      <Media body>
                                        <Media
                                          heading
                                          className="pmd-list-title"
                                        >
                                          {this.state.file.name}
                                        </Media>

                                        {!!this.state.uploaded && (
                                          <div>
                                            <Progress
                                              color="success"
                                              value={this.fileuploadProgress}
                                              className="pmd-progress mb-2"
                                            />
                                            <div className="d-flex align-items-center justify-content-between">
                                              {/* <p className="pmd-list-subtitle">3.5mb</p> */}
                                              <span className="">
                                                {this.fileuploadProgress} %
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                      </Media>

                                      {!this.state.uploaded && (
                                        <Media right>
                                          <Button
                                            color="primary"
                                            className="btn btn-sm pmd-ripple-effect pmd-btn-fab mr-2 pmd-icon-circle"
                                            title="Upload file"
                                            onClick={this.uploadFile}
                                          >
                                            <img
                                              src={uploadServer}
                                              alt=""
                                              className="img-fluid"
                                            />
                                          </Button>
                                          <Button
                                            color="light"
                                            className="btn btn-sm pmd-ripple-effect btn-gray-light pmd-btn-fab"
                                            title="Remove"
                                            onClick={this.clearImage}
                                          >
                                            <i className="material-icons pmd-sm">
                                              close
                                            </i>
                                          </Button>
                                        </Media>
                                      )}

                                      {!!this.state.isFileuploaded && (
                                        <Media right>
                                          <i className="material-icons pmd-icon-md text-success">
                                            check_circle
                                          </i>
                                        </Media>
                                      )}
                                    </Media>
                                  </div>
                                )}
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                      )}

                      <Row>
                        {!!this.state.isUploadedDataset && (
                          <Col md={6}>
                            <AvInput
                              name="dataset"
                              required
                              placeholder="Enter dataset link"
                              onChange={this.handleChange}
                            />
                            <div className="invalid-feedback">
                              Please enter uploaded dataset link!
                            </div>
                          </Col>
                        )}

                        <DataTypeList
                          onDataTypeChange={this.handleOptionsChange}
                          required={true}
                        />
                        {/* <AvGroup className="av-cs-wrap">
                            <AvSelect
                              placeholder="Select file type..."
                              name="datatype"
                              options={final_data_type}
                              onChange={this.handleOptionsChange.bind(
                                this,
                                'datatype'
                              )}
                              required
                            />
                            <div className="invalid-feedback">
                              Please select data type!
                            </div>
                          </AvGroup> */}
                        {/* </Col> */}

                        {!!this.state.isTargetColumnVisible && (
                          <Col md={6}>
                            <AvGroup>
                              <InputGroup>
                                <InputGroupAddon addonType="prepend">
                                  Target Column
                                </InputGroupAddon>
                                <AvInput
                                  placeholder="Enter target column"
                                  name="target_column"
                                  id="target_column"
                                  onChange={this.handleChange}
                                  required
                                />
                                <div className="invalid-feedback">
                                  Please enter target column!
                                </div>
                              </InputGroup>
                            </AvGroup>
                          </Col>
                        )}
                      </Row>
                    </div>

                    {/* Model File Upload  */}
                    <div className="form-section">
                      <Row>
                        <Col md={6}>
                          <AvGroup check>
                            <Label check>
                              <AvInput
                                type="checkbox"
                                name="isUploadedModelset"
                                onChange={this.handleChange}
                              />{' '}
                              Upload model files
                            </Label>
                          </AvGroup>
                        </Col>
                      </Row>

                      {!this.state.isUploadedModelset && (
                        <Row>
                          <Col md={12}>
                            <h3>Model File </h3>
                            <p>
                              Select a file from your local computer or drag and
                              drop and click on <b>upload file</b> to upload on
                              server.
                            </p>
                            <small className="form-text text-muted mb-2">
                              Supported formats AVI, WMV, MOV, MP4, TXT, CSV,
                              TSV, PNG, JPG, GIF, MP3, or WAV.
                            </small>

                            <FormGroup>
                              <Input
                                type="file"
                                name="modelFile"
                                id="modelfileUpload"
                                className="d-none"
                                onChange={this.handleChange}
                                required
                              />

                              {/* Add "custom-upload-error" class in label for error */}
                              <div className="custom-upload-wrap">
                                {!this.state.modelFile ? (
                                  <Label
                                    className="custom-upload"
                                    for="modelfileUpload"
                                  >
                                    {/* Upload placholder text */}
                                    <span className="custom-upload-content">
                                      <b>Drag and drop</b> or{' '}
                                      <u className="custom-upload-browse">
                                        Browse
                                      </u>{' '}
                                      file to upload
                                    </span>
                                  </Label>
                                ) : (
                                  <div className="uploaded-file-list">
                                    <Media className="uploaded-file-item">
                                      <Media
                                        left
                                        className="pmd-avatar-list-img"
                                      >
                                        <Media
                                          object
                                          src={audio}
                                          alt="uploaded Image"
                                          className="img-fluid"
                                        />
                                      </Media>

                                      <Media body>
                                        <Media
                                          heading
                                          className="pmd-list-title"
                                        >
                                          {this.state.modelFile.name}
                                        </Media>

                                        {!!this.state.modelUploaded && (
                                          <div>
                                            <Progress
                                              color="success"
                                              value={
                                                this.modelFileuploadProgress
                                              }
                                              className="pmd-progress mb-2"
                                            />
                                            <div className="d-flex align-items-center justify-content-between">
                                              {/* <p className="pmd-list-subtitle">3.5mb</p> */}
                                              <span className="">
                                                {this.modelFileuploadProgress} %
                                              </span>
                                            </div>
                                          </div>
                                        )}
                                      </Media>

                                      {!this.state.modelUploaded && (
                                        <Media right>
                                          <Button
                                            color="primary"
                                            className="btn btn-sm pmd-ripple-effect pmd-btn-fab mr-2 pmd-icon-circle"
                                            title="Upload file"
                                            onClick={this.uploadModelFile}
                                          >
                                            <img
                                              src={uploadServer}
                                              alt=""
                                              className="img-fluid"
                                            />
                                          </Button>
                                          <Button
                                            color="light"
                                            className="btn btn-sm pmd-ripple-effect btn-gray-light pmd-btn-fab"
                                            title="Remove"
                                            onClick={this.clearModelImage}
                                          >
                                            <i className="material-icons pmd-sm">
                                              close
                                            </i>
                                          </Button>
                                        </Media>
                                      )}

                                      {!!this.state.isFileuploaded && (
                                        <Media right>
                                          <i className="material-icons pmd-icon-md text-success">
                                            check_circle
                                          </i>
                                        </Media>
                                      )}
                                    </Media>
                                  </div>
                                )}
                              </div>
                            </FormGroup>
                          </Col>
                        </Row>
                      )}

                      <Row>
                        {!!this.state.isUploadedModelset && (
                          <Col md={6}>
                            <AvInput
                              name="modelset"
                              required
                              placeholder="Enter modelset link"
                              onChange={this.handleChange}
                            />
                            <div className="invalid-feedback">
                              Please enter uploaded modelset link!
                            </div>
                          </Col>
                        )}

                        <Col md={6} className="react-cs-wrap mb-3">
                          <AvGroup className="av-cs-wrap">
                            <AvSelect
                              placeholder="Select model type..."
                              name="modeltype"
                              options={final_model_type}
                              onChange={this.handleOptionsChange.bind(
                                this,
                                'modeltype'
                              )}
                            />
                          </AvGroup>
                        </Col>
                      </Row>
                    </div>

                    {/* Search Model tags  */}
                    {!this.state.isUploadedModelset && (
                      <div className="form-section">
                        <h3>Search Model</h3>
                        <p>
                          Select the domain, subdomain, and keyword tags for
                          search model.
                        </p>
                        <Row>
                          <Col md={6} className="react-cs-wrap mb-3">
                            <AvGroup>
                              <AvInput
                                name="keyword"
                                id="keyword"
                                placeholder="Enter keyword tag"
                                onChange={this.handleKeywordChange}
                              />
                              <div className="invalid-feedback">
                                This field is invalid
                              </div>
                            </AvGroup>
                            <Button
                              color="dark"
                              className="btn-sm pmd-ripple-effect pmd-btn-raised"
                              onClick={this.getModel}
                            >
                              {!!loading && (
                                <Spinner
                                  size="sm"
                                  color="light"
                                  className="mr-3 pmd-spinner"
                                />
                              )}
                              Search model
                            </Button>
                          </Col>

                          <DoaminSubDomainMultiSelectlist
                            onDomainSubDomainChange={
                              this.handleSearchModelChange
                            }
                          />
                        </Row>

                        {/* {final_model_list.length > 0 && (
                          <Row>
                            <Col md={6} className="react-cs-wrap mb-3">
                              <AvGroup className="av-cs-wrap">
                                <AvSelect
                                  placeholder="Select model..."
                                  name="taggedModel"
                                  options={final_model_list}
                                />

                                <div className="invalid-feedback">
                                  Please select model!
                                </div>
                              </AvGroup>
                            </Col>
                          </Row>
                        )} */}
                      </div>
                    )}

                    {/* AI Model Parameters  */}
                    <div className="form-section">
                      <AvGroup>
                        <h3>AI Model Parameters </h3>
                        <p>
                          Select the target device from the dropdown list for
                          processing data and enter the number of devices to
                          allocate to discover the AI model.
                        </p>
                        <Row>
                          {!this.state.isUploadedModelset && (
                            <BaseModelList
                              onBaseModelChange={this.handleOptionsChange}
                              isGenerateModelPage={
                                this.state.isGenerateModelPage
                              }
                              isDisable={true}
                            />
                          )}

                          <Col md={6} className="mb-3">
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                Number of devices
                              </InputGroupAddon>
                              <AvInput
                                placeholder="Enter numeric value"
                                name="num_device"
                                id="num_device"
                                required
                                onChange={this.handleChange}
                              />
                              <div className="invalid-feedback">
                                Please enter a devices!
                              </div>
                            </InputGroup>
                            <small className="form-text text-muted">
                              Supported two-digit numeric values for device
                            </small>
                          </Col>

                          <TargetDeviceList
                            apiType={this.state.apiType}
                            onTargetDeviceChange={this.handleOptionsChange}
                            required={true}
                          />
                        </Row>
                      </AvGroup>
                    </div>

                    {/* Performance parameter */}
                    <div className="form-section">
                      <AvGroup>
                        <h3 className="mb-3">Performance Parameters </h3>
                        <p>
                          Select the AI/ML Task from the dropdown list to
                          measure performance.
                        </p>
                        <Row>
                          <Col md={6} className="react-cs-wrap mb-3">
                            <AvGroup className="av-cs-wrap">
                              <AvSelect
                                placeholder="AI/ML Metric..."
                                name="performance_metric"
                                options={finalPerformanceMetric}
                                onChange={this.handleOptionsChange.bind(
                                  this,
                                  'performance_metric'
                                )}
                                required = {user.hasOwnProperty('performance_target') ? (user.performance_target!=='' ? true : false) : (false)}
                              />
                            </AvGroup>
                          </Col>

                          <Col md={6}>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                target
                              </InputGroupAddon>
                              <AvInput
                                placeholder="Enter Performance target"
                                name="performance_target"
                                id="performance_target"
                                onChange={this.handleChange}
                                required = {user.hasOwnProperty('performance_metric') ? (user.performance_metric!=='' ? true : false) : (false)}
                              />
                            </InputGroup>
                            <small className="form-text text-muted">
                              Supported numeric value
                            </small>
                          </Col>
                        </Row>
                      </AvGroup>
                    </div>

                    {/* Time Limit */}
                    <div className="form-section">
                      <AvGroup>
                        <h3 className="mb-3">Time Limit</h3>
                        <Row>
                          <Col md={6} className="mb-3 mb-md-0">
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                Hour
                              </InputGroupAddon>
                              <AvInput
                                placeholder="Enter numeric value"
                                name="hours"
                                id="hours"
                                onChange={this.handleChange}
                                required
                              />
                              <div className="invalid-feedback">
                                Please enter hours!
                              </div>
                            </InputGroup>
                            <small className="form-text text-muted">
                              Supported numeric value from 01 to 24 for hours
                            </small>
                          </Col>
                          <Col md={6}>
                            <InputGroup>
                              <InputGroupAddon addonType="prepend">
                                Days
                              </InputGroupAddon>
                              <AvInput
                                placeholder="Enter numeric value"
                                name="days"
                                id="days"
                                onChange={this.handleChange}
                                required
                              />
                              <div className="invalid-feedback">
                                Please enter days!
                              </div>
                            </InputGroup>
                            <small className="form-text text-muted">
                              Supported numeric value from 00 to 30 for days
                            </small>
                          </Col>
                        </Row>
                      </AvGroup>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <div className="d-flex justify-content-center">
              <Button
                disabled={
                  !!this.state.user && !!this.state.user.dataset ? false : true
                }
                color="primary"
                className="btn pmd-btn-raised pmd-btn-icon btn-lg w-xs-100"
              >
                {!!this.state.submitted && (
                  <Spinner
                    size="sm"
                    color="light"
                    className="mr-3 pmd-spinner"
                  />
                )}
                Generate Model{' '}
                <i className="material-icons md-light pmd-icon-sm ml-2 mr-0">
                  arrow_right_alt
                </i>
              </Button>
            </div>

            {/****** End Step 3 : Upload data files ******/}
          </AvForm>
        </Container>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  const { models_list, loading } = state.tags
  return { models_list, loading }
}

const connectedGenerateAIModel = connect(mapStateToProps)(GenerateAIModel)
export { connectedGenerateAIModel as GenerateAIModel }
