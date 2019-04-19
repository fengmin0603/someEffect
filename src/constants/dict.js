export const RADIO_YES = 1
export const RADIO_NO = 0
export const IMAGE = 'image'
export const PDF = 'pdf'
export const HTML_SYNC_DATA = `<span class="text-red">同步数据</span>`
export const UPLOAD_NOT_DONE = '请先等待附件上传完成'
// 拓展教务交接 - 租赁、物业合同信息没有填写的提示信息 用于除使用人1之外的提示
export const EDU_TRANS_TIP_MSG = '租赁、物业合同信息没有填写，请联系主项目负责人'
export const TXT_TIP = {
  UPLOAD: '附件仅支持pdf、jpg、jpeg、png、word、excel、ppt、压缩包格式',
  PROJECT: '附件仅支持dwg、pdf、jpg、jpeg、png、word、excel、ppt、压缩包格式'
}

/*
 * 项目上报的几个状态
 * 'project_pending'  // 新增项目待审核
 * 'project_accepted' // 新增项目通过审核
 * 'project_rejected' // 新增项目驳回
 * 'report_pending'   // 上报项目待审核
 * 'report_accepted'  // 上报项目通过审核
 * 'report_rejected'  // 上报项目驳回
 */
export const PROJECT_PENDING = 'project_pending'
export const PROJECT_ACCEPTED = 'project_accepted'
export const PROJECT_REJECTED = 'project_rejected'
export const REPORT_PENDING = 'report_pending'
export const REPORT_ACCEPTED = 'report_accepted'
export const REPORT_REJECTED = 'report_rejected'

export const projectStateTypes = {
  PROJECT_PENDING,
  PROJECT_ACCEPTED,
  PROJECT_REJECTED,
  REPORT_PENDING,
  REPORT_ACCEPTED,
  REPORT_REJECTED
}

/**
 * 表单验证规则
 */

const required = true
const trigger = ['blur', 'change']
const triggerSelect = ['change']
// const regTwoDecimal = //

export const formValidate = {
  // 文本框必填
  textRequired (message = '请填写') {
    return {
      required,
      message,
      trigger
    }
  },

  // 整数，最小为0
  getIntegerRule (message = '请填写正整数的数字', min = 0, max) {
    return {
      required,
      type: 'integer',
      message,
      min,
      trigger
    }
  },

  // 日期
  getDateRule (message = '请选择日期') {
    return {
      required,
      message,
      trigger
    }
  },

  // 数字项必填
  numRequired (required = true, type = 'number', message = '请填写数字0以上', min = 0) {
    return {
      required,
      type,
      min,
      message,
      trigger
    }
  },

  // 需为数字0
  getNumberRule (message = '数字需为0以上', min = 0) {
    return {
      type: 'number',
      message,
      min,
      trigger
    }
  },

  // 金额
  getAmountRule (message = '请填写金额') {
    return {
      required,
      type: 'number',
      min: 0,
      message,
      trigger
    }
  },

  // 金额保留两位小数
  getDecimalRule (message = '只能保留两位小数') {
    return {
      pattern: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
      message,
      trigger
    }
  },

  // 下拉选框不能为空
  requireTextarea (message = '不能为空') {
    return {
      type: 'number',
      required,
      message,
      triggerSelect
    }
  }
}

/**
 * 系统计算、系统加和文字占位
 */
export const textPlaceholder = {
  calc: '<span class="color999">系统计算</span>',
  add: '<span class="color999">系统加和</span>',
  match: '<span class="text-red">自动匹配</span>'
}

export const DOWNLOAD_EXT = ['zip', 'rar', 'ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx']
export const FILE_EXT = ['jpg', 'jpeg', 'png', 'pdf', 'ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'zip', 'rar']
