export const commonConstants = {
  dataType: {
    image: 'Image',
    video: 'Video',
    voice: 'Voice',
    tab: 'Tab',
    text: 'Text',
    rl: 'Rl',
    hrl: 'Hrl',
    unstrcutured: 'Unstrcutured'
  },
  dataTypeValue: {
    video: [
      'Grayscale',
      'Blur',
      'Enhancement',
      'EdgeDetection',
      'CornerDetection',
      'BackgroundSubtractor'
    ],
    image: [
      'Grayscale',
      'Blur',
      'Enhancement',
      'CornerDetection',
      'EdgeDetection'
    ],
    voice: [
      'Waveform',
      'Trim',
      'Denoise',
      'MFCC',
      'FastFourierTransform',
      'ShortTimeFourierTransform',
      'Beats_count'
    ]
  },
  modelType: {
    Pytorch: 'Pytorch',
    Mxnet: 'Mxnet'
  },
  monitorType: {
    covariate: 'covariate Shift',
    concept: 'concept Drift'
  },
  featureType: {
    all: 'All',
    modelmonitor: 'ModelMonitor',
    modelpredict: 'ModelPredict',
    modelgen: 'ModelGen',
    dataprep: 'DataPrep',
    modeldeploy: 'ModelDeployment'
  },
  /* featureValue: {
    All: 'All',
    modelmonitor: 'ModelMonitor',
    modelpredict: 'ModelPredict',
    modelgen: 'ModelGen',
    dataprep: 'DataPrep',
    modeldeploy: 'ModelDeployment'
  }, */
  evalMetric: {
    TopKAccuracy: 'TopKAccuracy',
    Accuracy: 'Accuracy',
    CrossEntropy: 'Cross Entropy'
  },

  performanceMetric: {
    accuracy: 'Accuracy',
    topkaccuracy: 'Top K Accuracy',
    precision: 'Precision',
    recall: 'Recall',
    'F1-score': 'F1-score',
    PixelAccuracy: 'Pixel Accuracy',
    IoU: 'mean Intersection over Union (mIoU)',
    HMA: 'Heat Map Accuracy',
    mAP: 'mean Average Precision (mAP)'
  },
  deployType: {
    cloud: 'Cloud',
    edge: 'Edge'
  },
  deployModelTransform: {
    pruning: 'Pruning',
    PTQ: "Post Training Quantization",
    QAT:"Quantize Aware Training",
    // quantization: 'Quantization',
    sds: 'SDS',
    compression: 'Compression',
    distillation: 'Distillation'
  },
  taskType: {
    classification: 'Classification',
    detection: 'Detection',
    segmentation: 'Segmentation'
  },

  Domains: {
    healthcare: 'Healthcare',
    finance: 'Finance',
    industry: 'Industry',
    transport: 'Transport'
  },
  SubDomains: {
    healthcare: {
      retinal_care_model: 'Retinal Care Models',
      endoscopy_model: 'Endoscopy Models',
      cervical_cancer_prescreening: 'Cervical Cancer Prescreening'
    },
    finance: {
      micro_finance_risk_model: 'MicroFinance Risk Models',
      loans_risk_model: 'Loans Risk Models',
      insurance_risk_model: 'Insurance Risk Models',
      underwriting_risk_model: 'Underwriting Risk Models'
    },
    industry: {
      clean_tech_model: 'Clean Tech Models',
      industry_4_0: 'Industry 4.0',
      ai_driven_manufacturing: 'AI Driven Manufacturing',
      robotics: 'Robotics',
      predictive_maintenance: 'Predictive Maintenance',
      industrial_iot: 'Industrial IoT'
    },
    transport: {
      automotive_object_detection: 'Automotive Object Detection',
      automotive_path_planning: 'Automotive Path Planning',
      drone_autonomous_navigation: 'Drone Autonomous Navigation',
      autonomous_trucks: 'Autonomous Trucks',
      indoor_navigation: 'Indoor Navigation'
    }
  },
  transformedModel:{
    mobilenetv2: 'MobileNet v2',
    resnet8: 'Resnet 8',
    resnet18_t: 'Resnet 18',
    resnet34: 'Resnet 34',
    alexnet: 'AlexNet'
  },
  //#region GENERATED MODEL Constants
  GET_GENERATED_MODEL_REQUEST: 'GET_GENERATED_MODEL_REQUEST',
  GET_GENERATED_MODEL_SUCCESS: 'GET_GENERATED_MODEL_SUCCESS',
  GET_GENERATED_MODEL_FAILURE: 'GET_GENERATED_MODEL_FAILURE',
  //#endregion BASE MODEL Constants

  //#region BASE MODEL Constants
  GET_BASE_MODEL_REQUEST: 'GET_BASE_MODEL_REQUEST',
  GET_BASE_MODEL_SUCCESS: 'GET_BASE_MODEL_SUCCESS',
  GET_BASE_MODEL_FAILURE: 'GET_BASE_MODEL_FAILURE',
  //#endregion BASE MODEL Constants

  //#region TARGET DEVICE Constants
  GET_TARGET_DEVICE_REQUEST: 'GET_TARGET_DEVICE_REQUEST',
  GET_TARGET_DEVICE_SUCCESS: 'GET_TARGET_DEVICE_SUCCESS',
  GET_TARGET_DEVICE_FAILURE: 'GET_TARGET_DEVICE_FAILURE',
  //#end region TARGET DEVICE Constants

  //#region TARGET DEVICE Constants
  GENERATE_MODEL_REQUEST: 'GENERATE_MODEL_REQUEST',
  GENERATE_MODEL_SUCCESS: 'GENERATE_MODEL_SUCCESS',
  GENERATE_MODEL_FAILURE: 'GENERATE_MODEL_FAILURE',
  //#end region TARGET DEVICE Constants

  //#region TARGET DEVICE Constants
  GET_DOMAIN_REQUEST: 'GET_DOMAIN_REQUEST',
  GET_DOMAIN_SUCCESS: 'GET_DOMAIN_SUCCESS',
  GET_DOMAIN_FAILURE: 'GET_DOMAIN_FAILURE',
  //#end region TARGET DEVICE Constants

  //#region TARGET DEVICE Constants
  GET_SUB_DOMAIN_REQUEST: 'GET_SUB_DOMAIN_REQUEST',
  GET_SUB_DOMAIN_SUCCESS: 'GET_SUB_DOMAIN_SUCCESS',
  GET_SUB_DOMAIN_FAILURE: 'GET_SUB_DOMAIN_FAILURE',
  //#end region TARGET DEVICE Constants

  //#region TAGS Constants
  LIST_TAGS_REQUEST: 'LIST_TAGS_REQUEST',
  LIST_TAGS_SUCCESS: 'LIST_TAGS_SUCCESS',
  LIST_TAGS_FAILURE: 'LIST_TAGS_FAILURE',
  //#end region TAGS Constants

  //#region TAGS Constants
  GET_MODELS_REQUEST: 'GET_MODELS_REQUEST',
  GET_MODELS_SUCCESS: 'GET_MODELS_SUCCESS',
  GET_MODELS_FAILURE: 'GET_MODELS_FAILURE',
  //#end region TAGS Constants

  //#region LIST_DATA_PREP_CMD Constants
  LIST_DATA_PREP_CMD_REQUEST: 'LIST_DATA_PREP_CMD_REQUEST',
  LIST_DATA_PREP_CMD_SUCCESS: 'LIST_DATA_PREP_CMD_SUCCESS',
  LIST_DATA_PREP_CMD_FAILURE: 'LIST_DATA_PREP_CMD_FAILURE',
  //#end region LIST_DATA_PREP_CMD Constants

  //#region LIST_MODEL_FORMAT Constants
  LIST_MODEL_FORMAT_REQUEST: 'LIST_MODEL_FORMAT_REQUEST',
  LIST_MODEL_FORMAT_SUCCESS: 'LIST_MODEL_FORMAT_SUCCESS',
  LIST_MODEL_FORMAT_FAILURE: 'LIST_MODEL_FORMAT_FAILURE',
  //#end region LIST_MODEL_FORMAT Constants

  //#region LIST_DEPLOYMENT_PRECISION Constants
  LIST_DEPLOYMENT_PRECISION_REQUEST: 'LIST_DEPLOYMENT_PRECISION_REQUEST',
  LIST_DEPLOYMENT_PRECISION_SUCCESS: 'LIST_DEPLOYMENT_PRECISION_SUCCESS',
  LIST_DEPLOYMENT_PRECISION_FAILURE: 'LIST_DEPLOYMENT_PRECISION_FAILURE',
  //#end region LIST_DEPLOYMENT_PRECISION Constants

  //#region MONITOR Constants
  MONITOR_REQUEST: 'MONITOR_REQUEST',
  MONITOR_SUCCESS: 'MONITOR_SUCCESS',
  MONITOR_FAILURE: 'MONITOR_FAILURE',
  //#end region MONITOR Constants

  //#region history Constants
  GET_HISTORY_REQUEST: 'GET_HISTORY_REQUEST',
  GET_HISTORY_SUCCESS: 'GET_HISTORY_SUCCESS',
  GET_HISTORY_FAILURE: 'GET_HISTORY_FAILURE',
  //#end region history Constants

  //#region history Constants
  UPLOADFILE_HISTORY_REQUEST: 'UPLOADFILE_HISTORY_REQUEST',
  UPLOADFILE_HISTORY_SUCCESS: 'UPLOADFILE_HISTORY_SUCCESS',
  UPLOADFILE_HISTORY_FAILURE: 'UPLOADFILE_HISTORY_FAILURE',
  //#end region history Constants

  //#region TARGET DEVICE Constants
  GET_DOMAIN_SUBDOMAIN_REQUEST: 'GET_DOMAIN_SUBDOMAIN_REQUEST',
  GET_DOMAIN_SUBDOMAIN_SUCCESS: 'GET_DOMAIN_SUBDOMAIN_SUCCESS',
  GET_DOMAIN_SUBDOMAIN_FAILURE: 'GET_DOMAIN_SUBDOMAIN_FAILURE',
  //#end region TARGET DEVICE Constants

  RESET_ACTION: 'RESET'
}
